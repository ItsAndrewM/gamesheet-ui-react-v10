import styled from "styled-components";
import { TabProps } from "@/atomic/01-atoms/Tab";
import { Children, InputHTMLAttributes, PropsWithChildren, ReactElement } from "react";

type TabElement = ReactElement<TabProps>;

const StyledTabView = styled.div.attrs({
    className: "tabview",
})``;

type TabViewProps = PropsWithChildren<{
    activeTab: string | number;
}> &
    InputHTMLAttributes<HTMLDivElement>;

const TabView = ({ children, activeTab, ...divProps }: TabViewProps) => {
    const tabs = Children.toArray(children) as TabElement[];

    return (
        <StyledTabView {...divProps}>
            {tabs.map((tab, index) => {
                return (
                    <div
                        key={index}
                        style={{ display: tab.props.name === activeTab || index === activeTab ? "contents" : "none" }}
                    >
                        {tab}
                    </div>
                );
            })}
        </StyledTabView>
    );
};

TabView.displayName = "TabView";
export { TabView };
