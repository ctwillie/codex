import Card from "@/Components/Card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { JSX } from "react";
import FilterForm from "@/Pages/Dashboard/Components/SearchForm";

export default function Index({ auth }: PageProps): JSX.Element {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Resources
                </h2>
            }
        >
            <Head title="Foo" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <Card>
                        <FilterForm />
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
