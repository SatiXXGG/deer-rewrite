import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { VotingModel, VotingService } from "server/services/VotingService";
import { Zone } from "@rbxts/zone-plus";

interface Attributes {
	icon: string;
	votes: number;
	name: string;
}

@Component({
	tag: "voting",
	defaults: {
		icon: "",
		votes: 0,
		name: "",
	},
})
export class Voting extends BaseComponent<Attributes, VotingModel> implements OnStart {
	private zone = new Zone(this.instance.hitbox);
	constructor(private VotingService: VotingService) {
		super();
	}
	onStart() {
		//* handle voting collision

		this.zone.playerEntered.Connect((player) => {
			this.VotingService.voteTo(this.attributes.name, player.UserId);
		});

		this.bindUpdates();
	}

	bindUpdates() {
		this.onAttributeChanged("icon", (icon) => {
			this.instance.screen.ui.mapImage.Image = icon;
		});

		this.onAttributeChanged("name", (name) => {
			this.instance.screen.ui.name.name.Text = name;
		});

		this.onAttributeChanged("votes", (votes) => {
			this.instance.screen.ui.votes.votes.Text = tostring(votes);
		});
	}
}
