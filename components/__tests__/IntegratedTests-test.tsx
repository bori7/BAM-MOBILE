import { apiPost } from "../../hooks/apiHooks";

describe("makeApiCall", () => {
  let mobileNo: string;
  let imageData: { base64: any };
  let VERIFY_FACE_URL: string;

  beforeEach(() => {
    mobileNo = "123456789";
    imageData = { base64: "base64string" };
    VERIFY_FACE_URL = "http://example.com/api/verifyface";
  });

  it("should call apiPost with correct params", async () => {
    const spyApiPost = jest.spyOn(apiPost);

    await makeApiCall();

    expect(spyApiPost).toHaveBeenCalledWith(
      VERIFY_FACE_URL,
      {},
      { msisdn: mobileNo, faceBase64: imageData.base64, affiliateCode: "ENG" }
    );
  });

  it("should set loading to true", async () => {
    let setLoading = jest.fn();

    await makeApiCall(setLoading);

    expect(setLoading).toHaveBeenCalledWith(true);
  });

  it("should set message and error to empty strings on success", async () => {
    let setMessage = jest.fn();
    let setError = jest.fn();

    await makeApiCall({}, setMessage, setError);

    expect(setMessage).toHaveBeenCalledWith("");
    expect(setError).toHaveBeenCalledWith("");
  });

  it("should set error and message to empty strings on failure", async () => {
    let errData = { message: "Failed Verification" };

    apiPost.mockImplementationOnce(() =>
      Promise.reject({ response: { data: errData } })
    );

    let setMessage = jest.fn();
    let setError = jest.fn();

    await makeApiCall({}, setMessage, setError);

    expect(setMessage).toHaveBeenCalledWith("");
    expect(setError).toHaveBeenCalledWith("Failed Verification");
  });
});
function makeApiCall() {
  throw new Error("Function not implemented.");
}
