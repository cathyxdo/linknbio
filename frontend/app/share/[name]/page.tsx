import Image from "next/image";
import { ListProfile } from "@/shared/interfaces";
import Link from "@/components/share/Link";
import SocialMedia from "@/components/share/SocialMedia";
import { notFound } from "next/navigation";
export default async function Page({ params }: any) {
  const list = await getList(params.name);

  if (!list) {
    notFound();
  }
  await logPageView(list.id);

  return (
    <div
      className={`flex flex-col items-center h-screen font-${list.profile_font}`}
      style={{ backgroundColor: list.background_color }}
    >
      <div className="px-4 flex flex-col gap-4 items-center text-center m-10 w-full max-w-2xl ">
        <div className="flex flex-col gap-2 items-center">
          {list.profile_photo_url && (
            <div className="">
              <Image
                src={list.profile_photo_url}
                width={100}
                height={100}
                style={{borderRadius: "50%"}}
                alt="profile-photo"
                className=""
              />
            </div>
          )}
          <div
            style={{ color: list.profile_font_color }}
            className="text-xl font-bold"
          >
            {list.name ? list.name : `@${list.username}`}
          </div>
          <div style={{ color: list.profile_font_color }} className="text-l">
            {list.bio}
          </div>
        </div>
        {list.social_media_icons_location === "top" && (
          <div>
            <div className="flex gap-4 mt-4 mb-4">
              {list.social_media_profiles &&
                list.social_media_profiles.map((profile) => (
                  <SocialMedia 
                    key={profile.id} 
                    profileLink={profile.link}
                    profileType={profile.type}
                    profileFontColor={list.profile_font_color}
                    profileId={profile.id}
                  />
                ))}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-6 w-full">
          {list.links &&
            list.links.map((link) => (
              <Link 
                key = {link.id}
                linkBubbleColor={list.link_bubble_color} 
                linkFontColor={list.link_font_color} 
                linkBubbleStyle={list.link_bubble_style}
                linkId={link.id}
                linkLink={link.link}
                linkTitle={link.title}
                linkPhotoUrl={link.link_photo_url}
              />
            ))}
        </div>
        {list.social_media_icons_location === "bottom" && (
          <div>
            <div className="flex gap-4 mt-4 mb-4">
              {list.social_media_profiles &&
                list.social_media_profiles.map((profile) => (
                  <SocialMedia 
                    key={profile.id} 
                    profileLink={profile.link}
                    profileType={profile.type}
                    profileFontColor={list.profile_font_color}
                    profileId={profile.id}
                  />
                ))}
            </div>
          </div>
        )}
        <ul></ul>
      </div>
    </div>
  );
}

async function getList(name: string): Promise<ListProfile | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_SERVER}/api/lists/view/` + name,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return null
  }

  const list: ListProfile = await res.json();
  console.log(res.ok)
  return list;
}

async function logPageView(listId: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_SERVER}/api/log/page_view/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ list_id: listId }),
  });

  if (!res.ok) {
    console.error("Failed to log page view");
  }
}