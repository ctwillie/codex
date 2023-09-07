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
import { SelectOption, TechnologySelectOption } from "@/types/select";
import EmptyState from "@/Components/EmptyState";
import CreateResourceModal from "@/Pages/Dashboard/Resources/CreateResourceModal";
import { Accordion, AccordionItem } from "@nextui-org/react";

type ResourcesProps = {
    resources: Resource[];
    resultsCount: number;
    categorySelectOptions: SelectOption[];
    technologySelectOptions: TechnologySelectOption[];
    tagSelectOptions: SelectOption[];
};

export default function Resources({
    auth,
    resources,
    resultsCount,
    categorySelectOptions,
    technologySelectOptions,
    tagSelectOptions,
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

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Resources" />

            <Tabs tabs={tabs} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 rounded-lg">
                    <Accordion
                        className="dark:bg-gray-800"
                        variant="bordered"
                        keepContentMounted
                    >
                        <AccordionItem
                            key="1"
                            aria-label="Search"
                            indicator={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 text-gray-500"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                                    />
                                </svg>
                            }
                            title={
                                <>
                                    <p className="inline">Search</p>
                                    <p className="px-4 text-sm text-gray-500 inline">
                                        Find what you're looking for
                                    </p>
                                </>
                            }
                            classNames={{
                                title: "dark:text-gray-100 pl-0 sm:pl-2 lg:pl-8",
                            }}
                        >
                            <div className="px-0 sm:px-4 lg:px-8 pb-6 lg:pb-10">
                                <ResourceSearchForm
                                    categorySelectOptions={
                                        categorySelectOptions
                                    }
                                    technologySelectOptions={
                                        technologySelectOptions
                                    }
                                />
                            </div>
                        </AccordionItem>
                    </Accordion>

                    <Card>
                        <div className="flex justify-end mb-12">
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
                                        tagSelectOptions={tagSelectOptions}
                                    />
                                </span>
                            </div>
                        </div>

                        {resources.length > 0 ? (
                            resources.map((resource) => (
                                <Fragment key={resource.id}>
                                    <ResourceListItem
                                        resource={resource}
                                        categorySelectOptions={
                                            categorySelectOptions
                                        }
                                        technologySelectOptions={
                                            technologySelectOptions
                                        }
                                        tagSelectOptions={tagSelectOptions}
                                    />
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
