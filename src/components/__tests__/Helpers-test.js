describe("validateInput", () => {
  it("should return false if mobileNo is undefined", () => {
    const mobileNo = undefined;
    const imageData = "imageData";
    const result = validateInput(mobileNo, imageData);

    expect(result).toBe(false);
  });

  it("should return false if mobileNo length is less than 10", () => {
    const mobileNo = "123456789";
    const imageData = "imageData";
    const result = validateInput(mobileNo, imageData);

    expect(result).toBe(false);
  });

  it("should return false if imageData is undefined", () => {
    const mobileNo = "1234567890";
    const imageData = undefined;
    const result = validateInput(mobileNo, imageData);

    expect(result).toBe(false);
  });

  it("should return true if both mobileNo and imageData are valid", () => {
    const mobileNo = "1234567890";
    const imageData = "imageData";
    const result = validateInput(mobileNo, imageData);

    expect(result).toBe(true);
  });
});
