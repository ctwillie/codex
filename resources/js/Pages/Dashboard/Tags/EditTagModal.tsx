import { useRef, useState, FormEventHandler } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { Tag } from "@/types/codex";

type EditTagProps = {
    tag: Tag;
};

export default function EditTagModal({ tag }: EditTagProps) {
    const [updatingTag, setUpdatingTag] = useState(false);
    const nameInput = useRef<HTMLInputElement>();
    const { id: tagId, name } = tag;

    const {
        data,
        setData,
        patch: update,
        processing,
        errors,
    } = useForm({
        name,
    });

    const confirmEditTag = () => {
        setUpdatingTag(true);
    };

    const updateTag: FormEventHandler = (e) => {
        e.preventDefault();

        update(route("tag.update", tagId), {
            onSuccess: () => closeModal(),
            onError: () => nameInput.current?.focus(),
        });
    };

    const closeModal = () => {
        setUpdatingTag(false);
    };

    return (
        <>
            <span
                onClick={confirmEditTag}
                className="text-indigo-400 hover:text-indigo-300 cursor-pointer"
            >
                Edit
            </span>

            <Modal show={updatingTag} onClose={closeModal}>
                <form onSubmit={updateTag} className="p-6">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Edit Tag
                        </h2>
                    </header>

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
