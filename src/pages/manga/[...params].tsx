import React, { useRef } from "react";
import { Media, MediaType } from "~/types/anilist";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { REVALIDATE_TIME } from "~/constants";
import { getMediaDetails } from "~/services/anilist";
import { Banner, Cover } from '~/components/manga_details';
import { Section, Head } from "~/components/shared";
import Tag from "~/components/shared/Tag";
import { VietNameseTitles } from "~/constants";
import Editor from '~/components/shared/Editor';
import InfoItem from "~/components/shared/InfoItem";
import Button from "~/components/shared/Button";
import { HiOutlineBookOpen } from 'react-icons/hi';
import { MdNotificationsActive, MdNotificationsNone } from "react-icons/md";
import MediaDescription from "~/components/shared/MediaDescription";
import DetailsSection from "~/components/shared/DetailsSection";
import { CharacterCard } from "~/components/manga_details";
interface DetailsPageProps {
    manga: Media;
}
const DetailsPage: NextPage<DetailsPageProps> = ({ manga }) => {

    console.log(JSON.stringify(manga, null, 2));
    
    return (
        <React.Fragment>
            <Head
                title={manga.title.userPreferred}
                description={manga.description}
                keywords=""
                key="head"
            />
            <div className="">
                <Banner
                    banner={manga.bannerImage}
                    title={manga.title.userPreferred}
                />
                <Section className="relative">
                    <div className="flex gap-8 ">
                        <div className="flex flex-col gap-10 ">
                            <div className="shrink-0 relative md:static md:left-0 md:-translate-x-0 w-[120px] md:w-[190px] -mt-32 h-[290px] space-y-6 ">
                                <Cover src={manga.coverImage.extraLarge} alt={manga.title.userPreferred} />
                            </div>

                            <div className="flex items-center space-x-3 justify-between gap-2  ">
                                <Button
                                    primary
                                    LeftIcon={HiOutlineBookOpen}
                                    iconClassName="w-8 h-8"
                                    className="text-white grow z-50 bg-blue-600 flex items-center justify-center py-2">
                                    <p className="text-2xl ">Đọc ngay</p>
                                </Button>
                                <div className=" rounded-full  hover:bg-slate-600 p-4 duration-500">
                                    <MdNotificationsNone className="w-10 h-10 " />
                                </div>
                            </div>
                        </div >
                        <div className="-mt-32">
                            <div className="text-[20px] text-gray-400 font-semibold">
                                {
                                    manga.staff.edges[0].node.name.full
                                }
                            </div>

                            <div className="mt-3">
                                <p className="text-3xl md:text-4xl font-bold mb-2">
                                    {manga.title.userPreferred}
                                </p>
                            </div>
                            <div className="mt-16">
                                <div className="flex gap-4 my-6">
                                    {
                                        manga.genres.map((gender, index) => {
                                            return (
                                                <Tag title={VietNameseTitles[gender]} key={index} link="" />
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            <div className="hidden md:flex gap-x-8 overflow-x-auto md:gap-x-16 [&>*]:shrink-0 mt-5">
                                <InfoItem
                                    title={`Quốc Gia`}
                                    value={VietNameseTitles[manga.countryOfOrigin]}
                                />

                                <InfoItem
                                    title={`Tình Trạng`}
                                    value={VietNameseTitles[manga.status]}
                                />
                                <InfoItem
                                    title={`Chaptter`}
                                    value={manga.chapters}
                                />
                                <InfoItem
                                    title={`Năm Phát Hành`}
                                    value={manga.startDate.year}
                                />
                                <InfoItem
                                    title={`Năm Kết Thúc`}
                                    value={manga.endDate.year}
                                />
                                <InfoItem
                                    title={`Độ tuổi`}
                                    value={manga.isAdult ? "18+" : ""}
                                />

                            </div>
                            <div className="mt-10 ">
                                <MediaDescription
                                    containerClassName="mt-4 mb-8 hidden md:block"
                                    className="text-gray-300 hover:text-gray-100 transition duration-300"
                                    readOnly
                                    defaultContent={manga.description}
                                />
                            </div>
                        </div>
                    </div>

                </Section>
                <Section className="w-full min-h-screen gap-8 mt-2 md:mt-8 space-y-8 md:space-y-0 md:grid md:grid-cols-10 sm:px-12">
                    <div className="md:col-span-2 h-[max-content] space-y-4">
                        <div className="flex flex-row md:flex-col overflow-x-auto  p-5 rounded-xl gap-4 [&>*]:shrink-0 md:no-scrollbar">
                            <InfoItem title="English" value={manga.title.english} />
                            <InfoItem title="Native" value={manga.title.native} />
                            <InfoItem title="Romanji" value={manga.title.romaji} />
                            <InfoItem
                                title="Phổ biến"
                                value={manga.popularity}
                            />
                            <InfoItem
                                title={"Yêu thích"}
                                value={(manga.favourites)}
                            />
                            <InfoItem
                                title={"Trending"}
                                value={(manga.trending)}
                            />

                            <InfoItem
                                title={"Tên khác"}
                                value={manga.synonyms.join("\n")}
                            />
                        </div>

                    </div >

                    <div className="md:col-span-8 space-y-12">
                        <DetailsSection title="Chapper" >
                            {

                            }
                        </DetailsSection>
                        {
                            !!manga.characters.edges.length && (
                                <DetailsSection
                                    title={'Nhân vật'}
                                    className="w-full grid md:grid-cols-2 grid-cols-1 gap-4"
                                >
                                    {manga.characters.edges.map((characterEdge, index) => (
                                        <CharacterCard
                                            characterEdge={characterEdge}
                                            key={index}
                                        />
                                    ))}
                                </DetailsSection>
                            )
                        }
                    </div>


                </Section>
            </div>
        </React.Fragment >
    )
}

export const getStaticProps: GetStaticProps = async ({
    params: { params },
}) => {
    try {
        const media = await getMediaDetails({
            type: MediaType.Manga,
            id: Number(params[0]),
        });

        return {
            props: {
                manga: media as Media,
            },
            revalidate: REVALIDATE_TIME,

        }
    } catch (error) {
        return {
            notFound: true,
            revalidate: REVALIDATE_TIME,
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {

    return { paths: [], fallback: 'blocking' };
};

export default DetailsPage;