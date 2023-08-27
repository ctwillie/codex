import Card from "@/Components/Card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { Fragment, JSX } from "react";
import ResourceSearchForm from "@/Pages/Dashboard/Resources/ResourceSearchForm";
import Tabs from "@/Components/Tabs";
import Divider from "@/Components/Divider";
import { Resource } from "@/types/codex";
import ResourceListItem from "@/Pages/Dashboard/Resources/ResouceListItem";
import { SelectOption } from "@/types/select";
import EmptyState from "@/Components/EmptyState";
import CreateResourceModal from "@/Pages/Dashboard/Resources/CreateResourceModal";

type ResourcesProps = {
    resources: Resource[];
    resultsCount: number;
    categorySelectOptions: SelectOption[];
    technologySelectOptions: SelectOption[];
};

export default function Resources({
    auth,
    resources,
    resultsCount,
    categorySelectOptions,
    technologySelectOptions,
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
                        <div className="flex justify-end">
                            <div className="flex items-center">
                                <p className="sm:flex-auto text-gray-400">
                                    {resultsCount} results
                                </p>
                                <span className="mt-4 sm:ml-8 sm:mt-0 sm:flex-none">
                                    <CreateResourceModal
                                        categorySelectOptions={
                                            categorySelectOptions
                                        }
                                        technologySelectOptions={
                                            technologySelectOptions
                                        }
                                    />
                                </span>
                            </div>
                        </div>

                        {resources.length > 0 ? (
                            resources.map((resource) => (
                                <Fragment key={resource.id}>
                                    <ResourceListItem resource={resource} />
                                    <Divider />
                                </Fragment>
                            ))
                        ) : (
                            <EmptyState className="mt-10" />
                        )}
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
