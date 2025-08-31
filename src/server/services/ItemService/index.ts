import { Service, OnStart } from "@flamework/core";
import { DeerSkinsInfo, WendigoSkinsInfo } from "shared/data/Skins";
import { EItemClass, GameItem } from "shared/types/GameItem";

@Service({})
export class ItemService implements OnStart {
	private Items = new Map<EItemClass, GameItem[]>();

	onStart() {
		//* Deer skins setup
		for (const [index, item] of pairs(DeerSkinsInfo)) {
			this.record(item);
		}
		//* Deer skins setup
		for (const [index, item] of pairs(WendigoSkinsInfo)) {
			this.record(item);
		}
	}

	record<T extends GameItem>(item: T) {
		assert(item.id, "Item must have an id");
		assert(item.class, "Item must have a class");
		const current = this.Items.get(item.class) || [];
		current.push(item);
		this.Items.set(item.class, current);
	}

	getInfo<T extends GameItem>(itemClass: EItemClass, id: string): T | undefined {
		const items = this.Items.get(itemClass) || [];
		const item = items.find((item) => item.id === id);
		return item as T;
	}
}
