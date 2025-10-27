import { render, screen } from "@testing-library/react";
import type { HTMLAttributes, ReactNode, Ref } from "react";
import { describe, expect, it, vi } from "vitest";

vi.mock("motion/react", async () => {
  const React = await import("react");

  const motion = new Proxy(
    {},
    {
      get: () =>
        React.forwardRef(function MotionDiv({ children, ...props }: MotionDivProps, ref: Ref<HTMLDivElement>) {
          return React.createElement(
            "div",
            {
              ref,
              "data-motion": "true",
              "data-initial": JSON.stringify(props.initial),
              "data-animate": JSON.stringify(props.animate),
              "data-transition": JSON.stringify(props.transition),
              ...props,
            },
            children,
          );
        }),
    },
  );

  return { motion };
});

import Content from ".";

type MotionDivProps = HTMLAttributes<HTMLDivElement> & {
  initial?: unknown;
  animate?: unknown;
  transition?: unknown;
  children?: ReactNode;
};

describe("Content", () => {
  it("renders children", () => {
    render(
      <Content>
        <span>Hello world</span>
      </Content>,
    );
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("forwards props to the underlying element", () => {
    render(
      <Content data-testid="content" className="p-4" id="content-id">
        child
      </Content>,
    );
    const el = screen.getByTestId("content");
    expect(el).toHaveClass("p-4");
    expect((el as HTMLElement).id).toBe("content-id");
  });

  it("applies default animation props", () => {
    render(
      <Content data-testid="content">x</Content>,
    );
    const el = screen.getByTestId("content");
    expect(el.getAttribute("data-motion")).toBe("true");

    const initial = JSON.parse(el.getAttribute("data-initial") || "null");
    const animate = JSON.parse(el.getAttribute("data-animate") || "null");
    const transition = JSON.parse(el.getAttribute("data-transition") || "null");

    expect(initial).toEqual({ opacity: 0, y: 20 });
    expect(animate).toEqual({ opacity: 1, y: 0 });
    expect(transition).toEqual({ duration: 0.6, delay: 0.6 });
  });
});


