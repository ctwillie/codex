import { JSX, useRef, useState, FormEventHandler, ChangeEvent } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import Select from "@/Components/Select";
import { SelectOption, TechnologySelectOption } from "@/types/select";
import Toggle from "@/Components/Toggle";

type CreateResourceModalProps = {
    categorySelectOptions: SelectOption[];
    technologySelectOptions: TechnologySelectOption[];
    tagSelectOptions: SelectOption[];
};

export default function CreateResourceModal({
    categorySelectOptions,
    technologySelectOptions,
    tagSelectOptions,
}: CreateResourceModalProps): JSX.Element {
    const [creatingResource, setCreatingResource] = useState(false);
    const nameInput = useRef<HTMLInputElement>();

    const {
        data,
        setData,
        post: store,
        processing,
        reset,
        errors,
    } = useForm({
        name: "",
        isOfficial: false,
        url: "",
        technologyId: "",
        tagIds: [] as string[],
        categoryId: categorySelectOptions[0].value,
    });

    const confirmCreateResource = () => {
        setCreatingResource(true);
    };

    const createResource: FormEventHandler = (e) => {
        e.preventDefault();

        store(route("resource.store"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => nameInput.current?.focus(),
        });
    };

    const closeModal = () => {
        setCreatingResource(false);
        reset();
    };

    const selectedTechnologyKeys = data.technologyId?.length
        ? [data.technologyId]
        : [];

    const filteredTechnologySelectOptions = technologySelectOptions.filter(
        (item: TechnologySelectOption) => {
            if (!data.categoryId) return true;

            return item.categoryId === data.categoryId;
        }
    );

    return (
        <>
            <button
                onClick={confirmCreateResource}
                className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
                Add
            </button>

            <Modal show={creatingResource} onClose={closeModal}>
                <form onSubmit={createResource} className="p-6">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Add Resource
                        </h2>
                    </header>

                    <div className="mt-6">
                        <Toggle
                            label="Official"
                            onChange={(enabled) =>
                                setData("isOfficial", enabled)
                            }
                        />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="name" value="Name" />

                        <TextInput
                            ref={nameInput}
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="mt-1 block w-3/4"
                            autoComplete="off"
                            isFocused
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="url" value="Url" />

                        <TextInput
                            id="url"
                            name="url"
                            value={data.url}
                            onChange={(e) => setData("url", e.target.value)}
                            className="mt-1 block w-3/4"
                            autoComplete="off"
                            required
                        />

                        <InputError message={errors.url} className="mt-2" />
                    </div>

                    <div className="mt-6 w-3/4">
                        <InputLabel
                            htmlFor="categoryId"
                            value="Catgory"
                            className="mb-1"
                        />
                        <Select
                            id="categoryId"
                            placeholder="Select a category"
                            options={categorySelectOptions}
                            selectedKeys={[data.categoryId]}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                setData((data) => ({
                                    ...data,
                                    categoryId: e.target.value,
                                    technologyId: "",
                                }));
                            }}
                        />
                    </div>

                    <div className="mt-6 w-3/4">
                        <InputLabel
                            htmlFor="technologyId"
                            value="Technology"
                            className="mb-1"
                        />
                        <Select
                            id="technologyId"
                            placeholder="Select a technology"
                            selectedKeys={selectedTechnologyKeys}
                            options={filteredTechnologySelectOptions}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                setData("technologyId", e.target.value);
                            }}
                        />
                    </div>

                    <div className="mt-6 w-3/4">
                        <InputLabel
                            htmlFor="tagIds"
                            value="Tags"
                            className="mb-1"
                        />
                        <Select
                            isMulti
                            id="tagIds"
                            placeholder="Select tags"
                            options={tagSelectOptions}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                const tagIds = e.target.value
                                    .split(",")
                                    .filter(Boolean);
                                setData("tagIds", tagIds);
                            }}
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <PrimaryButton className="ml-3" disabled={processing}>
                            Save
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}
