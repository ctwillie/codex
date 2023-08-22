import { TabOptions } from "@/types/tabs";
import { Link, router } from "@inertiajs/react";
import classNames from "classnames";

type TabsProps = {
    tabs: TabOptions[];
};

export default function Tabs({ tabs }: TabsProps) {
    return (
        <div>
            {/* Mobile */}
            <div className="sm:hidden">
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-screen mx-auto mt-4 rounded-md bg-gray-800 border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 dark:text-gray-100"
                    defaultValue={tabs.find((tab) => tab.current)?.href}
                    onChange={(e) => router.get(e.target.value)}
                >
                    {tabs.map((tab) => (
                        <option key={tab.name} value={tab.href}>
                            {tab.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Desktop */}
            <div className="hidden sm:block dark:bg-gray-800 pt-4">
                <div className="border-gray-100 flex justify-center">
                    <nav
                        className="-mb-px flex w-full max-w-7xl"
                        aria-label="Tabs"
                    >
                        {tabs.map((tab) => (
                            <Link
                                key={tab.name}
                                href={tab.href}
                                className={classNames(
                                    tab.current
                                        ? "border-indigo-500 text-gray-100"
                                        : "border-transparent text-gray-500 hover:border-indigo-500 hover:text-gray-100",
                                    "w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium"
                                )}
                                aria-current={tab.current ? "page" : undefined}
                            >
                                {tab.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}
