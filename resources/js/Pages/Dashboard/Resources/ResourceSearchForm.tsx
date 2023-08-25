import { JSX } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { FormEventHandler } from "react";
import Select from "@/Components/Select";
import { SelectOption } from "@/types/select";
import Toggle from "@/Components/Toggle";

type FilterFormProps = {
    categorySelectOptions: SelectOption[];
    className?: string;
};

export default function ResourceSearchForm({
    categorySelectOptions,
    className,
}: FilterFormProps): JSX.Element {
    const defaultFormState = {
        category: null,
        search: "",
        isOfficial: false,
    };

    const { data, setData, errors, processing, recentlySuccessful, transform } =
        useForm(defaultFormState);

    transform((data): any => {
        const { category, isOfficial, search } = data;

        return {
            search,
            categoryId: (category as unknown as SelectOption).value,
            isOfficial,
        };
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        router.reload({ data });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Search Filters
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Find the resources you are looking for
                </p>
            </header>

            <form onSubmit={onSubmit} className="mt-6 space-y-6">
                <div>
                    <Toggle
                        label="Official"
                        onChange={(enabled) => setData("isOfficial", enabled)}
                    />
                </div>

                <div>
                    <Select
                        id="category"
                        label="Category"
                        value={data?.category}
                        options={categorySelectOptions}
                        onChange={(selectedOption: any) =>
                            setData("category", selectedOption)
                        }
                    />
                </div>

                <div>
                    <InputLabel htmlFor="search" value="Search" />

                    <TextInput
                        id="search"
                        className="mt-1 block w-full"
                        value={data.search}
                        onChange={(e) => setData("search", e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.search} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Search</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
