import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { JSX } from "react";

export default function Error({ auth }: PageProps): JSX.Element {
    return (
        <AuthenticatedLayout user={auth.user} withNavigation={false}>
            <Head title="404" />

            <main className="grid min-h-full place-items-center bg-white dark:bg-gray-800 px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-indigo-600">
                        404
                    </p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                        Page not found
                    </h1>
                    <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-300">
                        Sorry, we couldn’t find the page you’re looking for.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href={route("dashboard")}
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Go back home
                        </Link>
                    </div>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}
