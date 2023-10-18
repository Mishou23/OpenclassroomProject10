import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./index";

jest.mock("./path/to/mockContactApi"); // Replace with the actual path to the mockContactApi

describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);
      fireEvent.click(screen.getByTestId("button-test-id"));

      // Wait for the text to change based on the 'sending' state
      await screen.findByText(/En cours|Envoyer/);

      // Ensure that the mockContactApi resolves before asserting the success function
      await jest.requireMock("./path/to/mockContactApi"); // Replace with the actual path
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
