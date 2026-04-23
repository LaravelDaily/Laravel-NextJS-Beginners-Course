'use client'

import { useSyncExternalStore } from "react";

type ViewMode = "grid" | "list";

const STORAGE_KEY = "products:view-mode";

let hasMounted = false;

function getStoredViewMode() {
  const storedViewMode = window.localStorage.getItem(STORAGE_KEY);

  return storedViewMode === "list" ? "list" : "grid";
}

function getSnapshot() {
  if (typeof window === "undefined" || !hasMounted) {
    return "grid";
  }

  return getStoredViewMode();
}

function subscribe(onStoreChange: () => void) {
  hasMounted = true;

  const syncFromStorage = () => {
    onStoreChange();
  };

  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      onStoreChange();
    }
  };

  queueMicrotask(syncFromStorage);
  window.addEventListener("storage", handleStorage);
  window.addEventListener(STORAGE_KEY, syncFromStorage);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(STORAGE_KEY, syncFromStorage);
  };
}

export function ProductsViewToggle({
  children,
}: {
  children: React.ReactNode;
}) {
  const viewMode = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => "grid",
  );

  function updateViewMode(nextViewMode: ViewMode) {
    window.localStorage.setItem(STORAGE_KEY, nextViewMode);
    window.dispatchEvent(new Event(STORAGE_KEY));
  }

  return (
    <div data-view-mode={viewMode}>
      <div className="mb-5 flex items-center justify-end">
        <div
          className="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm"
          role="tablist"
          aria-label="Product layout"
        >
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === "grid"}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
              viewMode === "grid"
                ? "bg-slate-950 text-white"
                : "text-slate-600 hover:text-slate-950"
            }`}
            onClick={() => updateViewMode("grid")}
          >
            Grid
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === "list"}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
              viewMode === "list"
                ? "bg-slate-950 text-white"
                : "text-slate-600 hover:text-slate-950"
            }`}
            onClick={() => updateViewMode("list")}
          >
            List
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}
