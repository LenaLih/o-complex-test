import {useGetReviewsQuery} from "@/api/reviewsApi"
import DOMPurify from "dompurify"
import s from "./reviews.module.scss"

export const Reviews = () => {
    const { data: reviews, isLoading, isError } = useGetReviewsQuery();

    if (isLoading) return <p>Загрузка...</p>;
    if (isError) return <p>Ошибка загрузки отзывов</p>;

    return (
        <div className={s.container}>
            {reviews?.map((review) => (
                <div
                    key={review.id}
                    className={s.reviews}
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(review.text, {
                            USE_PROFILES: { html: true }
                        }),
                    }}
                />
            ))}
        </div>
    )
}