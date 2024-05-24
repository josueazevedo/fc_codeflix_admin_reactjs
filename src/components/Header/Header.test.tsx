import Header from "./Header";

import { render } from "@testing-library/react";

describe("Header", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });
});
