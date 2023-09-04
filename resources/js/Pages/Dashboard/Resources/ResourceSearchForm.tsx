import { ChangeEvent, JSX } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import Select from "@/Components/Select";
import { SelectOption, TechnologySelectOption } from "@/types/select";
import Toggle from "@/Components/Toggle";

type FilterFormProps = {
    categorySelectOptions: SelectOption[];
    technologySelectOptions: TechnologySelectOption[];
    className?: string;
};

export default function ResourceSearchForm({
    categorySelectOptions,
    technologySelectOptions,
    className,
}: FilterFormProps): JSX.Element {
    const defaultFormState = {
        categoryId: "",
        technologyId: "",
        search: "",
        isOfficial: false,
    };

    const { data, setData, errors, processing } = useForm(defaultFormState);

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        router.reload({
            data: {
                ...data,
                search: data.search || null,
            },
        });
    };

    const sekectedTechnologyKeys = data.technologyId.length
        ? [data.technologyId]
        : [];

    const filteredTechnologySelectOptions = technologySelectOptions.filter(
        (item: TechnologySelectOption) => {
            if (!data.categoryId) return true;

            return item.categoryId === data.categoryId;
        }
    );

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

                <div className="sm:flex space-y-8 sm:space-y-0 sm:space-x-8">
                    <div className="sm:w-1/2">
                        <InputLabel
                            htmlFor="categoryId"
                            value="Catgory"
                            className="mb-1"
                        />
                        <Select
                            id="categoryId"
                            placeholder="Select a category"
                            options={categorySelectOptions}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                setData((data) => ({
                                    ...data,
                                    categoryId: e.target.value,
                                    technologyId: "",
                                }));
                            }}
                        />
                    </div>
                    <div className="sm:w-1/2">
                        <InputLabel
                            htmlFor="technologyId"
                            value="Technology"
                            className="mb-1"
                        />
                        <Select
                            id="technologyId"
                            placeholder="Select a technology"
                            selectedKeys={sekectedTechnologyKeys}
                            options={filteredTechnologySelectOptions}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                setData("technologyId", e.target.value);
                            }}
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
