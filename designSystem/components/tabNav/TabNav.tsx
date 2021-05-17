import React, {
  FC,
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect
} from 'react'
import styled from 'styled-components'
import shortId from 'shortid'
import { Button, ButtonProps } from '../button/Button'
import { Box } from '../box'

export type TabItem = {
  content: ReactNode | string;
  label: ReactNode | string;
  id: string;
};

/*
TODO:
- Add styled system
- Seperate out Nav and Tabs Styles for more control
- Extract Styles
- Add Reel to the Tab Navigation using the level extract tool.
-
*/

const TabContext = createContext({ selectedTab: null, setSelectedTab: null })

const TabButton = styled(Button)<ButtonProps>``

interface TabProps {
  tab: { [k: string]: ReactNode | string };
}

const Tab: FC<TabProps> = ({ children, tab }) => {
  const { selectedTab, setSelectedTab } = useContext(TabContext)
  const selected = selectedTab?.id === tab.id

  return (
    <TabButton
      variant='text' // selected prop
      selected={selected}
      onClick={(): void => setSelectedTab(tab)}
    >
      {children}
    </TabButton>
  )
}

export interface TabNavProps {
  tabItems: TabItem[];
}

const defaultProps: TabNavProps = {
  tabItems: []
}

export const TabNav: FC<TabNavProps> = ({ tabItems }) => {
  const [selectedTab, setSelectedTab] = useState(null)
  const [tabs] = useState(
    tabItems.reduce(
      (tabsList: TabItem[], tab) => [...tabsList, { ...tab, id: shortId() }],
      []
    )
  )

  useEffect(() => {
    setSelectedTab(tabs?.[0])
  }, [tabs])

  return (
    <TabContext.Provider value={{ selectedTab, setSelectedTab }}>
      <Box>
        {tabs.map((tab) => (
          <Tab tab={tab} key={tab?.id}>
            {tab.label}
          </Tab>
        ))}
      </Box>
      {selectedTab?.content}
    </TabContext.Provider>
  )
}

TabNav.defaultProps = defaultProps
TabNav.displayName = 'TabNav'
