import { Link } from "@tanstack/react-router";
import {
	BadgeCheck,
	Bell,
	Calendar,
	CalendarClock,
	CreditCard,
	EllipsisVertical,
	Filter,
	GalleryVerticalEnd,
	Inbox,
	LaptopIcon,
	LogOut,
	MoonIcon,
	Sparkles,
	SunIcon,
	SunMoon,
} from "lucide-react";
import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/context/theme-provider";
import { Button } from "../ui/button";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarRail,
} from "../ui/sidebar";
import { GlobalSearch } from "./GlobalSearch";

const navigationItems = [
	{
		title: "Tasks",
		items: [
			{
				title: "Inbox",
				to: "/inbox",
				icon: Inbox,
			},
			{
				title: "Today",
				to: "/today",
				icon: Calendar,
			},
			{
				title: "Upcoming",
				to: "/upcoming",
				icon: CalendarClock,
			},
		],
	},
	{
		title: "Organization",
		items: [
			{
				title: "Filters & Labels",
				to: "/filters",
				icon: Filter,
			},
		],
	},
];

const user = {
	name: "shadcn",
	email: "m@example.com",
	avatar: "/avatars/shadcn.jpg",
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { setTheme } = useTheme();

	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<div className="p-2">
							<div className="flex items-center justify-between gap-2">
								<div className="flex items-center gap-2">
									<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
										<GalleryVerticalEnd className="size-4" />
									</div>
									<div className="flex flex-col gap-0.5 leading-none">
										<span className="font-semibold">Todo App</span>
									</div>
								</div>
								<div className="flex items-center gap-2">
									<Button size="icon" variant="ghost" className="h-8 w-8">
										<Bell className="h-4 w-4" />
									</Button>
								</div>
							</div>
						</div>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<GlobalSearch />
				</SidebarGroup>

				{navigationItems.map((section) => (
					<SidebarGroup key={section.title}>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<span className="font-medium">{section.title}</span>
								</SidebarMenuButton>
								<SidebarMenuSub>
									{section.items.map((item) => (
										<SidebarMenuSubItem key={item.title}>
											<SidebarMenuSubButton asChild>
												<Link to={item.to} className="flex items-center gap-2">
													{item.icon && <item.icon className="h-4 w-4" />}
													{item.title}
												</Link>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
									))}
								</SidebarMenuSub>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroup>
				))}
			</SidebarContent>

			<SidebarFooter className="h-16 border-b border-sidebar-border">
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton
									size="lg"
									className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
								>
									<Avatar className="h-8 w-8 rounded-lg border border-border">
										<AvatarImage src={user.avatar} alt={user.name} />
										<AvatarFallback className="rounded-lg">CN</AvatarFallback>
									</Avatar>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-medium">{user.name}</span>
										<span className="truncate text-xs text-muted-foreground">{user.email}</span>
									</div>
									<EllipsisVertical className="ml-auto size-4 text-muted-foreground" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-[--radix-dropdown-menu-trigger-width] min-w-[256px]"
								align="start"
								sideOffset={8}
							>
								<DropdownMenuLabel className="font-normal">
									<div className="flex items-center gap-2 p-2">
										<Avatar className="h-8 w-8 rounded-lg border border-border">
											<AvatarImage src={user.avatar} alt={user.name} />
											<AvatarFallback className="rounded-lg">CN</AvatarFallback>
										</Avatar>
										<div className="grid flex-1">
											<span className="text-sm font-medium leading-none">{user.name}</span>
											<span className="text-xs text-muted-foreground">{user.email}</span>
										</div>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem className="gap-2">
										<Sparkles className="h-4 w-4" />
										<span>Upgrade to Pro</span>
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem className="gap-2">
										<BadgeCheck className="h-4 w-4" />
										<span>Account settings</span>
									</DropdownMenuItem>
									<DropdownMenuSub>
										<DropdownMenuSubTrigger className="gap-2">
											<SunMoon className="h-4 w-4" />
											<span>Theme</span>
										</DropdownMenuSubTrigger>
										<DropdownMenuPortal>
											<DropdownMenuSubContent>
												<DropdownMenuItem className="gap-2" onSelect={() => setTheme("light")}>
													<SunIcon className="h-4 w-4" />
													<span>Light</span>
												</DropdownMenuItem>
												<DropdownMenuItem className="gap-2" onSelect={() => setTheme("dark")}>
													<MoonIcon className="h-4 w-4" />
													<span>Dark</span>
												</DropdownMenuItem>
												<DropdownMenuItem className="gap-2" onSelect={() => setTheme("system")}>
													<LaptopIcon className="h-4 w-4" />
													<span>System</span>
												</DropdownMenuItem>
											</DropdownMenuSubContent>
										</DropdownMenuPortal>
									</DropdownMenuSub>
									<DropdownMenuItem className="gap-2">
										<CreditCard className="h-4 w-4" />
										<span>Billing</span>
									</DropdownMenuItem>
									<DropdownMenuItem className="gap-2">
										<Bell className="h-4 w-4" />
										<span>Notifications</span>
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
									<LogOut className="h-4 w-4" />
									<span>Log out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>

			<SidebarRail />
		</Sidebar>
	);
}
