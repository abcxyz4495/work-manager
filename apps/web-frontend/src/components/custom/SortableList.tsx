import React, { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
	DndContext,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	type DragEndEvent,
} from "@dnd-kit/core";
import type { Active, UniqueIdentifier } from "@dnd-kit/core";
import { SortableContext, arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import { SortableOverlay } from "./SortableOverlay";

interface BaseItem {
	id: UniqueIdentifier;
}

interface Props<T extends BaseItem> {
	items: T[];
	onChange(items: T[]): void;
	renderItem(item: T): ReactNode;
}

export function SortableList<T extends BaseItem>({ items, onChange, renderItem }: Props<T>) {
	const [active, setActive] = useState<Active | null>(null);
	const activeItem = useMemo(() => items.find((item) => item.id === active?.id), [active, items]);
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (over && active.id !== over.id) {
			const activeIndex = items.findIndex(({ id }) => id === active.id);
			const overIndex = items.findIndex(({ id }) => id === over.id);
			onChange(arrayMove(items, activeIndex, overIndex));
		}
		setActive(null);
	};

	return (
		<DndContext
			sensors={sensors}
			onDragStart={({ active }) => setActive(active)}
			onDragEnd={handleDragEnd}
			onDragCancel={() => setActive(null)}
		>
			<SortableContext items={items}>
				<ul className="flex flex-col gap-2" role="application">
					{items.map((item) => (
						<React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
					))}
				</ul>
			</SortableContext>
			<SortableOverlay>{activeItem ? renderItem(activeItem) : null}</SortableOverlay>
		</DndContext>
	);
}
