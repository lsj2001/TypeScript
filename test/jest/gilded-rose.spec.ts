import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
  it("should update the name of the item", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  it("should degrade quality twice as fast after sell by date", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(3);
  });

  it("should not have a negative quality", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it('should handle "Aged Brie" quality increase', () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(11);
  });

  it("should not have a quality more than 50", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 5, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it('should handle "Backstage passes" quality changes', () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10),
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(11);
    expect(items[1].quality).toBe(12);
    expect(items[2].quality).toBe(13);
    expect(items[3].quality).toBe(0);
  });

  it('should handle "Conjured" items quality decrease', () => {
    const gildedRose = new GildedRose([new Item("Conjured Mana Cake", 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);
  });

  it('should handle "Sulfuras" not decreasing in quality or sellIn', () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 5, 80),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(5);
  });
});
