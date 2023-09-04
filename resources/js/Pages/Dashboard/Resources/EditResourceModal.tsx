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
import { Resource } from "@/types/codex";

type EditResourceModalProps = {
    resource: Resource;
    categorySelectOptions: SelectOption[];
    technologySelectOptions: TechnologySelectOption[];
};

export default function EditResourceModal({
    resource,
    categorySelectOptions,
    technologySelectOptions,
}: EditResourceModalProps): JSX.Element {
    const [editingResource, setEditingResource] = useState(false);
    const nameInput = useRef<HTMLInputElement>();
    const { name, isOfficial, technology, category, url } = resource;

    const {
        data,
        setData,
        patch: update,
        processing,
        errors,
    } = useForm({
        name,
        isOfficial,
        url,
        technologyId: technology?.id || "",
        categoryId: category.id,
    });

    const confirmEditResource = () => {
        setEditingResource(true);
    };

    const editResource: FormEventHandler = (e) => {
        e.preventDefault();

        update(route("resource.update", resource.id), {
            onSuccess: () => closeModal(),
            onError: () => nameInput.current?.focus(),
        });
    };

    const closeModal = () => {
        setEditingResource(false);
    };

    const sekectedTechnologyKeys = data.technologyId?.length
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
            <span
                onClick={confirmEditResource}
                className="text-indigo-400 hover:text-indigo-300 cursor-pointer"
            >
                Edit
            </span>

            <Modal show={editingResource} onClose={closeModal}>
                <form onSubmit={editResource} className="p-6">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Edit Resource
                        </h2>
                    </header>

                    <div className="mt-6">
                        <Toggle
                            label="Official"
                            enabled={data.isOfficial}
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
                        />

                        <InputError message={errors.name} className="mt-2" />
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
                            selectedKeys={sekectedTechnologyKeys}
                            options={filteredTechnologySelectOptions}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                setData("technologyId", e.target.value);
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
