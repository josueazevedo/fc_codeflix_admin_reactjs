import { Layout } from "./Layout";

import { render } from "@testing-library/react";

describe("Header", () => {
  it("should render correctly", () => {
    const { asFragment } = render(
      <Layout>
        <p>Any</p>
      </Layout>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
