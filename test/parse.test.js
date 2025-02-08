const { parseEnv } = require("../parse");

describe("parseEnv function", () => {
  test("parses simple key-value pairs", () => {
    const envString = "KEY=value\nNAME=John";
    const expected = { KEY: "value", NAME: "John" };
    expect(parseEnv(envString)).toEqual(expected);
  });

  test("trims whitespace around keys and values", () => {
    const envString = "  KEY =  value  \n  NAME = John  ";
    const expected = { KEY: "value", NAME: "John" };
    expect(parseEnv(envString)).toEqual(expected);
  });

  test("ignores comments", () => {
    const envString = "# This is a comment\nKEY=value";
    const expected = { KEY: "value" };
    expect(parseEnv(envString)).toEqual(expected);
  });

  test("handles quoted values", () => {
    const envString = "KEY=\"value with spaces\"\nNAME='single quoted'";
    const expected = { KEY: "value with spaces", NAME: "single quoted" };
    expect(parseEnv(envString)).toEqual(expected);
  });

  test("handles escaped equal signs", () => {
    const envString = "PASSWORD=my\\=secure\\=password";
    const expected = { PASSWORD: "my=secure=password" };
    expect(parseEnv(envString)).toEqual(expected);
  });

  test("ignores empty lines", () => {
    const envString = "\nKEY=value\n\nNAME=John\n";
    const expected = { KEY: "value", NAME: "John" };
    expect(parseEnv(envString)).toEqual(expected);
  });
});
