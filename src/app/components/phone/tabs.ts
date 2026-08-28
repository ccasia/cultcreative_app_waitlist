export type TabId = "home" | "campaigns" | "chat" | "invoice";

export const TABS: {
	id: TabId;
	label: string;
	icon: string;
	screen: string;
}[] = [
	{
		id: "home",
		label: "Home",
		icon: "/images/app/home.svg",
		screen: "/images/app/screen-home.png",
	},
	{
		id: "campaigns",
		label: "Campaigns",
		icon: "/images/app/campaigns.svg",
		screen: "/images/app/screen-campaigns.png",
	},
	{
		id: "chat",
		label: "Chat",
		icon: "/images/app/chat.svg",
		screen: "/images/app/screen-chat.png",
	},
	{
		id: "invoice",
		label: "Invoice",
		icon: "/images/app/invoice.svg",
		screen: "/images/app/screen-invoice.png",
	},
];
