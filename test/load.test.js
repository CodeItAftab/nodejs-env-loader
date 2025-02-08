const fs = require("fs");
const path = require("path");
const { load } = require("../index");

jest.mock("fs");

describe("load function", () => {
  const mockEnvContent =
    "KEY=value\nNAME=John\nNODE_ENV=development\nPATH=/fake/path";

  beforeEach(() => {
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(mockEnvContent);
    process.env = { ...process.env }; // Reset env vars
  });

  test("loads environment variables correctly", () => {
    const result = load({ path: ".env" });

    expect(result.parsed).toEqual({
      KEY: "value",
      NAME: "John",
      NODE_ENV: "development",
      PATH: "/fake/path",
    });

    expect(process.env.KEY).toBe("value");
    expect(process.env.NAME).toBe("John");
  });

  test("does not override important environment variables", () => {
    process.env.PATH = "/usr/bin";
    process.env.HOME = "/home/user";
    process.env.NODE_ENV = "production";

    fs.readFileSync.mockReturnValue(
      "PATH=/fake/path\nHOME=/fake/home\nNODE_ENV=development"
    );

    load({ path: ".env" });

    // Ensure protected variables remain unchanged
    expect(process.env.PATH).toBe("/usr/bin");
    expect(process.env.HOME).toBe("/home/user");
    expect(process.env.NODE_ENV).toBe("production");
  });

  test("allows overriding protected variables when override is true", () => {
    process.env.PATH = "/usr/bin";
    process.env.NODE_ENV = "production";

    fs.readFileSync.mockReturnValue("PATH=/fake/path\nNODE_ENV=development");

    load({ path: ".env", override: true });

    expect(process.env.PATH).toBe("/fake/path");
    expect(process.env.NODE_ENV).toBe("development");
  });

  test("returns an error if the file does not exist", () => {
    fs.existsSync.mockReturnValue(false);

    const result = load({ path: ".env" });

    expect(result.error).toBeInstanceOf(Error);
    expect(result.error.message).toMatch(/not found/);
    expect(result.parsed).toEqual({});
  });

  test("prevents loading files outside the current working directory", () => {
    const fakePath = path.resolve("..", "outside.env");
    const result = load({ path: fakePath });

    expect(result.error).toBeTruthy();
    expect(result.error).toBeInstanceOf(Error);
    expect(result.error.message).toBe("Access to this file is restricted.");
    expect(result.parsed).toEqual({});
  });
});
