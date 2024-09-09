import {
  Images,
  ScrollText,
  Settings,
  Share2,
  Shuffle,
  UserRoundPlus,
  Wrench,
} from "lucide-react";
import { Helmet } from "react-helmet";
import SettingsListCard from "../../../components/SettingsListCard";
import PageHeader from "./../../../components/PageHeader";

export default function SettingsPage() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Settings || infoSchoolBD</title>
      </Helmet>

      <PageHeader text="সেটিংস" icon={<Settings className="w-4 h-4" />} />

      <div className="mt-5 flex flex-col gap-1">
        <SettingsListCard
          icon={<Wrench className="w-4 h-4" />}
          text="প্রতিষ্ঠানের তথ্য পরিবর্তন করুন"
          link="/user/settings/change-institute-info"
        />
        <SettingsListCard
          icon={<ScrollText className="w-4 h-4" />}
          text="পরিচিতি এডিট করুন"
          link="/user/settings/edit-about"
        />
        <SettingsListCard
          icon={<Share2 className="w-4 h-4" />}
          text="সোসিয়াল মিডিয়া লিংকস"
          link="/user/settings/social-media"
        />
        <SettingsListCard
          icon={<UserRoundPlus className="w-4 h-4" />}
          text="অ্যাডমিশন সেটিংস"
          link="/user/settings/admission-settings"
        />
        <SettingsListCard
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
              />
            </svg>
          }
          text="প্রধান শিক্ষকের বানী"
          link="/user/settings/head-teacher-bani"
        />

        <SettingsListCard
          icon={<Shuffle className="w-4 h-4" />}
          text="শুভাকাঙ্গীদের বানী"
          link="/user/settings/testimonials"
        />

        <SettingsListCard
          icon={<Images className="w-4 h-4" />}
          text="প্রতিষ্ঠানের ছবি"
          link="/user/settings/school-pictures"
        />
      </div>
    </>
  );
}
