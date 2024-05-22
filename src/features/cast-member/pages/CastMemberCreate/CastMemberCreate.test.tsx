import { renderWithProviders } from "../../../../utils/test-utils";
import { CastMemberCreate } from "./CastMemberCreate";

describe("CastMemberCreate", () => {
  it("should render", () => {
    const { asFragment } = renderWithProviders(<CastMemberCreate />);
  });
});
