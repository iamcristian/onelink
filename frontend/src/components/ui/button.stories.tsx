import { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

// Define metadata for the Button component
const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"], // Tag for autodocs
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
    size: {
      control: { type: "radio" },
      options: ["default", "sm", "lg", "icon"],
    },
    className: { control: "text" },
    onClick: { action: "clicked" },
  },
  args: {
    variant: "default",
    size: "default",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Historia por defecto para el Button
export const Default: Story = {
  args: {
    children: "Click Me",
  },
};

// Historia para el botón primario
export const Primary: Story = {
  args: {
    variant: "default",
    children: "Primary Button",
  },
};

// Historia para el botón secundario
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

// Historia para el botón grande
export const Large: Story = {
  args: {
    size: "lg",
    children: "Large Button",
  },
};

// Historia para el botón pequeño
export const Small: Story = {
  args: {
    size: "sm",
    children: "Small Button",
  },
};

// Historia para un botón deshabilitado
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
};
