import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import React from "react";

import { AppSidebar } from "@/components/specific/AppSidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	const windowDown = window.innerWidth < 768;
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className={`flex h-16 shrink-0 items-center gap-2 ${windowDown ? "border-b" : ""}`}>
					<div className="flex items-center gap-2 px-3">
						<SidebarTrigger />
						<Separator orientation="vertical" className="mr-2 h-4" />
						<BreadcrumbComponent />
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4">
					<Outlet />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}

function BreadcrumbComponent() {
	const path = useLocation().pathname.split("/");
	return (
		<Breadcrumb>
			<BreadcrumbList>
				{path.slice(1).map((segment, index) => (
					<React.Fragment key={index}>
						<BreadcrumbItem>
							<BreadcrumbLink href={`/${path.slice(1, index + 2).join("/")}`}>
								<BreadcrumbPage>{segment.toUpperCase()}</BreadcrumbPage>
							</BreadcrumbLink>
						</BreadcrumbItem>
						{index < path.slice(1).length - 1 && (
							<BreadcrumbSeparator className="hidden md:block" />
						)}
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
