import { JSX } from "react";
import Badge from "@/Components/Badge";
import { Resource } from "@/types/codex";

type ResourceListItemProps = {
    resource: Resource;
    className?: string;
};

export default function ResourceListItem({
    resource,
    className = "",
}: ResourceListItemProps): JSX.Element {
    const { id: resourceId, name, isOfficial, url, tags } = resource;

    return (
        <div className={className}>
            <p className="mb-4">
                {name}
                {isOfficial && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-green-400 inline-block ml-2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                )}
            </p>

            <p className="mb-3 underline hover:no-underline cursor-pointer">
                <a
                    href={url}
                    className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500"
                    target="_blank"
                >
                    {url}
                    <svg
                        className="w-4 h-4 ml-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                    </svg>
                </a>
            </p>

            <div className="flex justify-items-start mt-6">
                {tags.map((tag) => (
                    <Badge key={`${tag.name}-${resourceId}`} label={tag.name} />
                ))}
            </div>
        </div>
    );
}
