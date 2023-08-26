import Card from "@/Components/Card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { Fragment, JSX } from "react";
import ResourceSearchForm from "@/Pages/Dashboard/Resources/ResourceSearchForm";
import Tabs from "@/Components/Tabs";
import Divider from "@/Components/Divider";
import { Resource } from "@/types/codex";
import ResourceListItem from "./Resources/ResouceListItem";
import { SelectOption } from "@/types/select";

type ResourcesProps = {
    resources: Resource[];
    resultsCount: number;
    categorySelectOptions: SelectOption[];
};

export default function Resources({
    auth,
    resources,
    resultsCount,
    categorySelectOptions,
}: PageProps<ResourcesProps>): JSX.Element {
    const tabs: Array<any> = [
        {
            name: "Resources",
            href: route("dashboard"),
            current: route().current("dashboard"),
        },
        {
            name: "Categories",
            href: route("dashboard.categories"),
            current: route().current("dashboard.categories"),
        },
        {
            name: "Technologies",
            href: route("dashboard.technologies"),
            current: route().current("dashboard.technologies"),
        },
        {
            name: "Tags",
            href: route("dashboard.tags"),
            current: route().current("dashboard.tags"),
        },
    ];

    /**
     * TODO: list
     * - [ ] preserve state on page refresh
     * - [ ] show results count
     */

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Resources" />

            <Tabs tabs={tabs} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <Card>
                        <ResourceSearchForm
                            categorySelectOptions={categorySelectOptions}
                        />
                    </Card>

                    <Card>
                        <div className="flex justify-end mb-6 -mt-6">
                            <h2 className="text-sm dark:text-gray-400">
                                {resultsCount} results
                            </h2>
                        </div>

                        {resources.length > 0 ? (
                            resources.map((resource) => (
                                <Fragment key={resource.id}>
                                    <ResourceListItem resource={resource} />
                                    <Divider />
                                </Fragment>
                            ))
                        ) : (
                            <EmptyResourceState />
                        )}
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function EmptyResourceState(): JSX.Element {
    return (
        <div className="flex flex-col items-center justify-center">
            <p className="text-gray-500 text-sm">Sorry, nothing to see here</p>
        </div>
    );
}
