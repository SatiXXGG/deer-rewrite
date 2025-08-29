import { Service, OnStart } from "@flamework/core";
import { EItemClass, GameItem } from "shared/types/GameItem";

@Service({})
export class ItemService implements OnStart {
	private Items = new Map<EItemClass, GameItem[]>();

	onStart() {}

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
