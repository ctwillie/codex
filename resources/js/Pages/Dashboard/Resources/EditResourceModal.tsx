import { JSX, useRef, useState, FormEventHandler } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import Select from "@/Components/Select";
import { SelectOption } from "@/types/select";
import Toggle from "@/Components/Toggle";
import { Resource } from "@/types/codex";

type EditResourceModalProps = {
    categorySelectOptions: SelectOption[];
    resource: Resource;
    technologySelectOptions: SelectOption[];
};

export default function EditResourceModal({
    categorySelectOptions,
    resource,
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
        transform,
    } = useForm({
        name,
        isOfficial,
        url,
        technology: {
            value: technology.id,
            label: technology.name,
        },
        category: {
            value: category.id,
            label: category.name,
        },
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

    transform((data): any => {
        const { category, technology, isOfficial, name, url } = data;

        return {
            name,
            isOfficial,
            categoryId: category?.value,
            technologyId: technology?.value,
            url,
        };
    });

    const closeModal = () => {
        setEditingResource(false);
    };

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
                        <Select
                            id="category"
                            label="Category"
                            value={data.category}
                            options={categorySelectOptions}
                            onChange={(selectedOption: any) =>
                                setData("category", selectedOption)
                            }
                        />
                    </div>

                    <div className="mt-6 w-3/4">
                        <Select
                            id="technology"
                            label="Technology"
                            value={data.technology}
                            options={technologySelectOptions}
                            onChange={(selectedOption: any) =>
                                setData("technology", selectedOption)
                            }
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
