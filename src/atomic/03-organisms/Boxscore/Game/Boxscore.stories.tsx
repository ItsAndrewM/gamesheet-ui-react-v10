import { Meta, StoryObj } from "@storybook/react";
import { Boxscore } from ".";

const meta: Meta<typeof Boxscore> = {
    title: "Builds/Pages/Boxscore",
    tags: ["autodocs", "status:draft"],
    component: Boxscore,
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;

export type Story = StoryObj<typeof Boxscore>;

// Global template that allows selecting a type and entering text
export const Primary: Story = {
    render: (_args, { loaded }) => {
        const { boxscoreData } = loaded;
        return (
            <div className="w-full max-w-7xl h-full mx-auto">
                <Boxscore boxscoreData={boxscoreData} />
            </div>
        );
    },
};
