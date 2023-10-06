export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items: Array<Item> = []) {
    this.items = items;
  }

  updateQuality(): Array<Item> {
    for (let item of this.items) {
      this.updateItem(item);
    }
    return this.items;
  }

  updateItem(item: Item): void {
    switch (item.name) {
      case "Aged Brie":
        this.updateAgedBrie(item);
        break;
      case "Sulfuras, Hand of Ragnaros":
        // Do nothing for Sulfuras
        break;
      case "Backstage passes to a TAFKAL80ETC concert":
        this.updateBackstagePasses(item);
        break;
      default:
        if (item.name.startsWith("Conjured")) {
          this.updateConjured(item);
        } else {
          this.updateNormal(item);
        }
        break;
    }

    // Decrease sellIn for all items except "Sulfuras"
    if (item.name !== "Sulfuras, Hand of Ragnaros") {
      item.sellIn -= 1;
    }
  }

  updateNormal(item: Item): void {
    if (item.sellIn <= 0) {
      item.quality -= 2;
    } else {
      item.quality -= 1;
    }
    item.quality = Math.max(item.quality, 0);
  }

  updateAgedBrie(item: Item): void {
    if (item.sellIn <= 0) {
      item.quality += 2;
    } else {
      item.quality += 1;
    }
    item.quality = Math.min(item.quality, 50);
  }

  updateBackstagePasses(item: Item): void {
    if (item.sellIn <= 0) {
      item.quality = 0;
    } else if (item.sellIn <= 5) {
      item.quality += 3;
    } else if (item.sellIn <= 10) {
      item.quality += 2;
    } else {
      item.quality += 1;
    }
    item.quality = Math.min(item.quality, 50);
  }

  updateConjured(item: Item): void {
    if (item.sellIn <= 0) {
      item.quality -= 4;
    } else {
      item.quality -= 2;
    }
    item.quality = Math.max(item.quality, 0);
  }
}
