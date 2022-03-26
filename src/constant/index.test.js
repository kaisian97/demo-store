import { STORES } from "constant";

test("Store Malaysia config values correct", () => {
  expect(STORES[0].name).toEqual("Malaysia");
  expect(STORES[0].rate).toEqual(3.1);
  expect(STORES[0].currency).toEqual("MYR");
  expect(STORES[0].value).toBeTruthy();
  expect(STORES[0].secret).toBeTruthy();
});

test("Store Singapore config values correct", () => {
  expect(STORES[1].name).toEqual("Singapore");
  expect(STORES[1].rate).toEqual(1);
  expect(STORES[1].currency).toEqual("SGD");
  expect(STORES[1].value).toBeTruthy();
  expect(STORES[1].secret).toBeTruthy();
});
