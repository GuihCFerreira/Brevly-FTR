import { SpinnerIcon, DownloadSimpleIcon } from "@phosphor-icons/react";
import { Fragment } from "react/jsx-runtime";
import { EmptyLinksList } from "./empty-links-list";
import { LinkListLoading } from "./link-list-loading";
import { ShortenedLinkItem } from "./shortened-link-item";
import { Button } from "./ui/button";
import { Divider } from "./ui/divider";
import { LoadingBar } from "./ui/loading-bar";
import { downloadUrl } from "../utils/download-url";
import { exportLinksReport } from "../http/export-links-report";
import { getLinks } from "../http/get-links";
import { useQuery } from "@tanstack/react-query";

export function ShortenedLinksList() {
  const { isFetching, data } = useQuery({
    queryKey: ["getLinks"],
    queryFn: getLinks,
    initialData: [],
  });

  const {
    refetch: refetchExportReport,
    isFetching: isExportingReport,
    data: exportedReportData,
  } = useQuery({
    queryKey: ["exportLinksReport"],
    queryFn: exportLinksReport,
    initialData: { reportUrl: "" },
    enabled: false,
    staleTime: 1000 * 60 * 5,
  });

  const handleDownloadCSV = async () => {
    if (data.length === 0) return;
    await refetchExportReport();
    if (!exportedReportData || !exportedReportData.reportUrl) return;
    await downloadUrl(exportedReportData.reportUrl);
  };

  return (
    <div className="relative overflow-hidden bg-gray-100 flex flex-col p-6 gap-4 rounded-lg h-fit max-h-79 md:p-8 md:gap-5 md:w-7/12 md:max-h-99">
      {isFetching && <LoadingBar />}

      <div className="flex items-center justify-between flex-wrap">
        <h3 className="font-bold text-lg text-gray-600">Meus links</h3>
        <Button
          variant="secondary"
          disabled={data.length === 0 || isExportingReport}
          onClick={handleDownloadCSV}
        >
          {isExportingReport ? (
            <SpinnerIcon className="size-4 animate-spin text-gray-400" />
          ) : (
            <DownloadSimpleIcon className="size-4" />
          )}
          Baixar CSV
        </Button>
      </div>

      <Divider />

      {isFetching && <LinkListLoading />}

      {data.length === 0 && !isFetching && <EmptyLinksList />}

      {data.map((link, index) => (
        <Fragment key={link.id}>
          <ShortenedLinkItem link={link} />
          {index < data.length - 1 && <Divider />}
        </Fragment>
      ))}
    </div>
  );
}
