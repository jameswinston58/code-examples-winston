import React, {Component} from 'react';
import { Tab, Menu, Loader } from 'semantic-ui-react'
import queryString from 'query-string'
import { compose } from 'recompose'
import {editMotorcycleSectionInfo, masterMotoEditSection} from './motoEditFormSections.js'
import ListingTabWrapper from './motoEditFormTabWrapper.js'
import { withWizard } from '../../../account/infoWizard/callUserWizard.js' //not included in exam
import { withListingCalls } from '../calls/runMotoListing.js'
import { makeTitleCase } from '../../../common/util' //not included in examples
import { BASIC_STEP } from '../../../list/motorcycle/steps/stepInfo.js' //not included in example


const buildPanes = (listingData, editSections, onSuccess) => {

    const panes = []

    editMotorcycleSectionInfo.forEach((section, sectionIndex) => {

        for(let i = 0; i<section.pages.length; i++) {

            let page = editSections[section.pages[i]]

            let optionalProps = {}

            if(page.menu_link_type !== 'tab' ) {
                continue
            }
            
            if(page.massage_edit_data) {
                optionalProps['massageData'] = page.massage_edit_data
            }
            
            if(page.augment_edit_validation) {
                optionalProps['augmentValidation'] = page.augment_edit_validation
            }
            
            if(page.before_submit) {
                optionalProps['beforeHandleSubmit'] = (values, setError) => page.before_submit(values, setError)
            }

            panes.push({
                menuItem : page.tab_name,
                render: () => 
                <Tab.Pane>
                    <h2>{page.edit_tab_header}</h2>
                    {page.tab_type !== 'screen' && (
                        <ListingTabWrapper
                            {...optionalProps}
                            motorcycleState={listingData.state}
                            key={page.tab_name}
                            tabName={page.tab_name}
                            defaultValues={page.default_edit_values}
                            listingData={listingData}
                            description={page.description}
                            bikeID={listingData.motorcycle_uuid_id}
                            bikePrettyID={listingData.motorcycle_pretty_id}
                            hideSaveButton={page.hide_save_button ? true : false}
                            onSuccess={ data => {onSuccess(data)}}
                            render={({ errors, setFieldValue, values, setTouched }) => (
                                page.edit_tab_contents(values, errors, setFieldValue, setTouched)
                            )}       
                        />
                    )}
                    
                    {page.tab_type === 'screen' && (
                        page.edit_tab_contents(onSuccess)
                    )}              
                </Tab.Pane>
            })  
        }
    })
    return panes
}


class MotoEditForm extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            loadingError : false,
            hasData : false,
            listingData : null,
            bikeID : null, //set these on component load
            activeIndex : BASIC_STEP,
            editSections : [],
            panesNameArray: []
        }
    }


    componentDidMount() {
        
        //If we have a hash in the URL, then let's navigate that to that tab
        //Else, let's just show the basic info tab
        
        let paneHash = queryString.parse(this.props.location.hash)
        
        if(paneHash.page) {

            let setActiveIndex = false

            editMotorcycleSectionInfo.forEach((section, sectionIndex) => {
                for(let i = 0; i<section.pages.length; i++) {
                    if(section.pages[i] === paneHash.page) {
                        setActiveIndex = true
                        break
                    }
                }
            })

            if(setActiveIndex) {
                this.setState({
                    activeIndex : paneHash.page
                })    
            }

        }


        let bikeID = this.props.match.params.bikeID
        
        this.props.fetchListing('Get Bike Listing for Edit Page - ' + bikeID, bikeID).then(function (responseData) {
            
            if(responseData.motorcycle_state === 'pending' || responseData.motorcycle_state === 'incomplete') {
                //If the motorcycle listing had never been we present the other, more wizard based UI
                this.props.history.push('/list/motorcycle/edit/' + bikeID)
            }
            
            const editSections = masterMotoEditSection(responseData)

            this.setState({
                isLoading: false,
                hasData : true,
                listingData : responseData,
                bikeID : bikeID,
                editSections : editSections,
                panesNameArray : this.makePanesArrayNames(editSections),
            })
           
        }.bind(this)).catch(function (responseData) {
            
            this.setState({
                isLoading: false,
                hasData : false,
                loadingError : true,
            })

        }.bind(this))
    }
  

    makePanesArrayNames = (editSections) => {
        
        //making this array in state allows us to easily find the
        //active index in the tabs. Semantic UI wants an array index and doesn't care about the
        //page=nnn and tabName params we are using    

        const panesNameArray = []
        
        editMotorcycleSectionInfo.forEach((section, sectionIndex) => {
            for(let i = 0; i<section.pages.length; i++) {
                    let page = editSections[section.pages[i]]
                    if(page.menu_link_type !== 'tab' ) {
                        continue
                    }
                    panesNameArray.push(page.tab_name) 
                }
        })
        
        return panesNameArray
    } 

  
  setListingData = (data) => {
    
    let newListingData = {
        ...this.state.listingData,
        ...data
    }
 
    this.setState({
        listingData : newListingData
    })
  
}

  findActiveTab = (activeIndexName) => {
    return this.state.panesNameArray.indexOf(activeIndexName)
  }

  render() {
      
  const { isLoading, hasData, listingData, loadingError, activeIndex, editSections } = this.state  
  return (
    <React.Fragment>

        {isLoading && !hasData && !loadingError && (
            <div className="page-container edit-page-container">  
                <Loader active size='large'>Warming Up...</Loader>
            </div>
        )}

        {!isLoading && !hasData && loadingError && (
                    <div className="page-container edit-page-container"> 
                    <div>
                        <i class="fad fa-exclamation-circle"></i>
                        <h3>Looks like something went wrong.</h3>
                    </div>
                </div>
        )}

        {!isLoading && hasData && !loadingError && (
            <div className="page-container edit-page-container">        
                <MetaTags 
                    title={"Edit Your Motorcycle Listing" }
                    description="Edit Your Motorcycle Listing on Twisted Road"
                />   
                <div className="row">
                    <div className="col-xs-12 col-md-9 col-md-offset-3">
                        <h1>Edit Motorcycle</h1>
                        <div className={"listing-state-badge " + listingData.motorcycle_state}>
                            <i class="fas fa-circle"></i> {makeTitleCase(listingData.motorcycle_state)}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-3">
                        {!this.props.isMobile && ( //build the desktop menu
                            <Menu text vertical>
                                {editMotorcycleSectionInfo.map((section, i) => (
                                    <>
                                        <Menu.Item header>{section.section_header}</Menu.Item> 
                                        {section.pages.map((pageKey, i) => {
                                            let page = editSections[pageKey]
                                        return (
                                            <Menu.Item
                                                    name={page.menu_name}
                                                    active={activeIndex === page.tab_name}
                                                    onClick={
                                                        page.menu_link_type === 'tab' ?
                                                        () => { 
                                                            this.setState({ activeIndex : page.tab_name })
                                                            this.props.history.push("#page=" + page.tab_name)
                                                        } :
                                                        () => {} //if not a tab, then null out the onClick with a doop
                                                    }
                                                    target={page.menu_link_type === 'link' ? '_blank' : false }
                                                    rel={page.menu_link_type === 'link' ? "noopener noreferrer" : false }
                                                    href={page.menu_link_type === 'link' ? page.menu_link_config.url : false }
                                                    className={page.menu_classname ? page.menu_classname : false }
                                                >
                                                    {page.menu_content}
                                                </Menu.Item>
                                            )})}
                                    </>
                                ))}
                            </Menu>
                        )}
                    </div>
                    {this.props.isMobile && (
                        <div className="mobile-edit-menu">
                            {editMotorcycleSectionInfo.map((section, i) => (
                                <>
                                    {section.pages.map((pageKey, i) => {
                                        
                                        let page = editSections[pageKey]
                                        
                                        return (
                                            <a
                                                name={page.menu_name}
                                                onClick={
                                                    page.menu_link_type === 'tab' ?
                                                    () => { 
                                                        this.setState({ activeIndex : page.tab_name })
                                                        this.props.history.push("#page=" + page.tab_name)
                                                    } :
                                                    () => {} //doop
                                                }
                                                target={page.menu_link_type === 'link' ? '_blank' : false }
                                                rel={page.menu_link_type === 'link' ? "noopener noreferrer" : false }
                                                href={page.menu_link_type === 'link' ? page.menu_link_config.url : false }
                                                className={page.menu_classname ? page.menu_classname : false }
                                            >
                                                {page.menu_content}
                                            </a>
                                        )
                                    })}
                                </>
                            ))}   
                        </div>
                    )}
                    <div className="col-xs-12 col-md-9 edit-listing-panes-wrap">
                        <Tab
                            activeIndex={this.findActiveTab(activeIndex)}
                            onTabChange={this.handleTabChange}
                            menu={{ style : { display : 'none' } }}
                            panes={
                                buildPanes(
                                    listingData, 
                                    editSections, 
                                    this.setListingData, 
                                    this.setPanesArrayNames 
                                )
                            }
                        />
                    </div>
                </div>   
             </div>
            )}
        </React.Fragment>
      )
    } 
}

export default compose(
  withWizard,
  withListingCalls,
)(MotoEditForm)
