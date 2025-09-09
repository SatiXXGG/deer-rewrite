import React, { Ref, useEffect, useState } from "@rbxts/react";
import RQuestHeader from "./header";
import RQuestDaily from "./daily";
import RQuestWeekly from "./weekly";
import RQuestFrame from "./QuestFrame";
import { GetQuest, IQuest } from "shared/data/Quest";
import { Events, Functions } from "client/network";

interface Props {
	ref: Ref<ImageLabel>;
}

export default function RQuestsUi({ ref }: Props) {
	const [quests, setQuests] = useState<IQuest[]>([]);
	const [dailyQuests, setDailyQuests] = useState<IQuest[]>([]);
	const [weeklyQuests, setWeeklyQuests] = useState<IQuest[]>([]);

	useEffect(() => {
		const daily = quests.filter((q) => {
			const hours = q.expires / 60 / 24;
			return hours <= 1 && hours > 0;
		});
		const weekly = quests.filter((q) => {
			const hours = q.expires / 60 / 24;
			return hours >= 2;
		});
		setDailyQuests(daily);
		setWeeklyQuests(weekly);
	}, [quests]);

	useEffect(() => {
		Functions.quests
			.getQuests()
			.timeout(1)
			.then((result) => {
				const newQuests: IQuest[] = [];
				result.forEach((id) => {
					const data = GetQuest(id);
					if (data) newQuests.push(data);
				});
				setQuests(newQuests);
			})
			.catch((e) => {
				error(e);
			});

		const conn = Events.quests.updateQuest.connect((id, newCurrent, status) => {
			setQuests((prev) => {
				const copy = [...prev];
				const index = copy.findIndex((q) => q.id === id);
				if (index > -1) {
					copy[index] = { ...copy[index], current: newCurrent, status };
				}
				return copy;
			});
		});

		return () => conn.Disconnect();
	}, []);

	return (
		<imagelabel
			ref={ref}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
			Image={"rbxassetid://139895220411161"}
			key="Quests"
			Position={UDim2.fromScale(0.5, 0.5)}
			ScaleType={Enum.ScaleType.Fit}
			Size={UDim2.fromScale(1, 1)}
		>
			<frame
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				key="Holder"
				Position={UDim2.fromScale(0.5, 0.587719)}
				Size={UDim2.fromScale(0.945148, 0.733898)}
			>
				<uilistlayout
					key="UIListLayout"
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					Padding={new UDim(0.0178571, 0)}
					SortOrder={Enum.SortOrder.LayoutOrder}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>
				<RQuestDaily>
					{dailyQuests.map((quest) => (
						<RQuestFrame
							key={quest.id}
							reference={quest.reference}
							current={quest.current}
							title={quest.title}
							status={quest.status}
							id={quest.id}
						/>
					))}
				</RQuestDaily>
				<RQuestWeekly>
					{weeklyQuests.map((quest) => (
						<RQuestFrame
							key={quest.id}
							reference={quest.reference}
							current={quest.current}
							title={quest.title}
							status={quest.status}
							id={quest.id}
						/>
					))}
				</RQuestWeekly>
			</frame>
			<RQuestHeader />
			<uiaspectratioconstraint key="UIAspectRatioConstraint" AspectRatio={2.00847} />
		</imagelabel>
	);
}
