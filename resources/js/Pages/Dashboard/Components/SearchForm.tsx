import { JSX } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { FormEventHandler } from "react";
import Select from "@/Components/Select";
import { SelectOption } from "@/types/select";

const selectOptions: SelectOption[] = [
    { id: 1, name: "Wade Cooper" },
    { id: 2, name: "Arlene Mccoy" },
    { id: 3, name: "Devon Webb" },
    { id: 4, name: "Tom Cook" },
    { id: 5, name: "Tanya Fox" },
    { id: 6, name: "Hellen Schmidt" },
    { id: 7, name: "Caroline Schultz" },
    { id: 8, name: "Mason Heaney" },
    { id: 9, name: "Claudie Smitham" },
    { id: 10, name: "Emil Schaefer" },
];

type FilterFormProps = {
    className?: string;
};

export default function FilterForm({
    className,
}: FilterFormProps): JSX.Element {
    const {
        data,
        setData,
        post,
        errors,
        processing,
        recentlySuccessful,
        transform,
    } = useForm({
        category: selectOptions[0],
        text: "",
    });

    transform((data): any => {
        return {
            text: data.text,
            categoryID: data.category.id,
        };
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("dashboard.search"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Search Filters
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Find the resources you are looking for.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <Select
                        id="category"
                        label="Category"
                        value={data.category}
                        options={selectOptions}
                        onChange={(selectedOption: any) => {
                            console.log(
                                "custom select onChange",
                                selectedOption
                            );
                            setData("category", selectedOption);
                        }}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="text" value="Text" />

                    <TextInput
                        id="text"
                        className="mt-1 block w-full"
                        value={data.text}
                        onChange={(e) => setData("text", e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.text} />
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
