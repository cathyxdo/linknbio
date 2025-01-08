import VisibilityIcon from '@mui/icons-material/Visibility';
import LinkIcon from '@mui/icons-material/Link';
import PeopleIcon from '@mui/icons-material/People';
import { People } from '@mui/icons-material';
interface TotalsProps {
    pageViews: number,
    linkClicks: number,
    socialMediaClicks: number
}
export default function TotalCounts({ pageViews, linkClicks, socialMediaClicks }: TotalsProps) {
    return (

            <div className="bg-white p-10 rounded-xl shadow">
                <h3 className="text-lg font-bold mb-4">Totals</h3>
                <div className="flex gap-2 flex-col md:flex-row w-full md:justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-slate-200 rounded-lg">
                            <VisibilityIcon className="text-black" />
                        </div>
                        <div className="flex gap-2">
                            <div className="font-bold">{pageViews}</div>
                            <div>Page Views</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-slate-200 rounded-lg">
                            <LinkIcon className="text-black" />
                        </div>
                        <div className="flex gap-2">
                            <div className="font-bold">{linkClicks}</div>
                            <div>Link Clicks</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-slate-200 rounded-lg">
                            <PeopleIcon className="text-black" />
                        </div>
                        <div className="flex gap-2">
                            <div className="font-bold">{socialMediaClicks}</div>
                            <div >Social Media Clicks</div>
                        </div>
                    </div>
                </div>
            </div>

    )
}