import { JSX } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import Select from "@/Components/Select";
import { SelectOption } from "@/types/select";
import Toggle from "@/Components/Toggle";

type FilterFormProps = {
    categorySelectOptions: SelectOption[];
    technologySelectOptions: SelectOption[];
    className?: string;
};

export default function ResourceSearchForm({
    categorySelectOptions,
    technologySelectOptions,
    className,
}: FilterFormProps): JSX.Element {
    const defaultFormState = {
        category: null,
        technology: null,
        search: "",
        isOfficial: false,
    };

    const { data, setData, errors, processing, transform } =
        useForm(defaultFormState);

    transform((data): any => {
        const { category, technology, isOfficial, search } = data;

        return {
            search,
            isOfficial,
            categoryId: (category as unknown as SelectOption).value,
            technologyId: (technology as unknown as SelectOption).value,
        };
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const { category, technology, isOfficial, search } = data;
        router.reload({
            data: {
                search: search || undefined,
                isOfficial,
                categoryId: (category as unknown as SelectOption)?.value,
                technologyId: (technology as unknown as SelectOption)?.value,
            },
        });
    };

    return (
        <section className={className}>
            <header className="mb-10">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Search
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Find what your're looking for
                </p>
            </header>

            <form onSubmit={onSubmit} className="mt-6 space-y-6">
                <div>
                    <Toggle
                        label="Official"
                        onChange={(enabled) => setData("isOfficial", enabled)}
                    />
                </div>

                <div className="sm:flex space-y-6 sm:space-y-0 sm:space-x-8">
                    <div className="sm:w-1/2">
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
                    <div className="sm:w-1/2">
                        <Select
                            id="technology"
                            label="Technology"
                            value={data?.technology}
                            options={technologySelectOptions}
                            onChange={(selectedOption: any) =>
                                setData("technology", selectedOption)
                            }
                        />
                    </div>
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

                <div className="flex items-center gap-4 justify-end">
                    <PrimaryButton disabled={processing}>Search</PrimaryButton>
                </div>
            </form>
        </section>
    );
}
