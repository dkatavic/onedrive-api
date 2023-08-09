import {DriveItem, ItemPreviewInfo, Permission, ThumbnailSet} from "@microsoft/microsoft-graph-types";

declare namespace oneDriveAPI {
  type DriveSpecification = {drive?: "me", driveId?: "" | "me"} | {drive: "user" | "drive" | "group" | "site", driveId: string};
  type ItemSpecifiation = {itemId: string} | {itemPath: string};
  type ParentSpecification = {parentId: string} | {parentPath: string} | {}
  type AccessToken = {accessToken: string};
  type ODataQueryParamaters = {queryParameters: string};

  type ListChildrenParams = AccessToken & DriveSpecification & (ItemSpecifiation | {}) & Partial<ODataQueryParamaters>;
  type ListChildrenFn = (params: ListChildrenParams) => Promise<{
    "@odata.nextLink"?: string,
    value: DriveItem[]
  }>;

  type CreateFolderParams = {
    name: string
  } & AccessToken & DriveSpecification & (ItemSpecifiation | {});
  type CreateFolderFn = (params: CreateFolderParams) => Promise<DriveItem>;

  type UploadSimpleParams = {
    readableStream: NodeJS.ReadableStream,
    filename: string
  } & AccessToken & DriveSpecification & ParentSpecification
  type UploadSimpleFn = (params: UploadSimpleParams) => Promise<DriveItem>;

  type UploadSessionParams = {
    readableStream: NodeJS.ReadableStream,
    filename: string,
    fileSize: number,
    chunksToUpload?: number,
    conflictBehavior?: "rename" | "fail" | "replace"
  } & AccessToken & DriveSpecification & ParentSpecification
  type UploadSessionProgress = (bytesUploaded: number) => void;
  type UploadSessionFn = (params: UploadSessionParams, progress?: UploadSessionProgress) => Promise<DriveItem>;

  type UpdateParams = {
    toUpdate: Partial<DriveItem>
  } & AccessToken & DriveSpecification & ItemSpecifiation;
  type UpdateFn = (params: UpdateParams) => Promise<DriveItem>;

  type GetMetadataParams = AccessToken & DriveSpecification & ItemSpecifiation;
  type GetMetadataFn = (params: GetMetadataParams) => Promise<DriveItem>;

  type DownloadParams = {
    format?: "glb" | "html" | "jpg" | "pdf"
  } & AccessToken & DriveSpecification & ItemSpecifiation;
  type DownloadFn = (params: DownloadParams) => Promise<NodeJS.ReadableStream>

  type PartialDownloadParams = {
    bytesFrom?: number,
    bytesTo: number
  } & AccessToken & DriveSpecification & (ItemSpecifiation | {graphDownloadURL: string});
  type PartialDownloadFn = (params: PartialDownloadParams) => Promise<NodeJS.ReadableStream>

  type SyncParams = {
    next?: string
  } & AccessToken & DriveSpecification
  type SyncFn = (params: SyncParams) => Promise<
    {"@odata.nextLink": string, value: DriveItem[]} |
    {"@odata.deltaLink": string, value: DriveItem[]}>;


  type HTTPMethods = "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE"
  type CustomEndpointParams = {
    url: string,
    body?: object,
    method?: HTTPMethods | Lowercase<HTTPMethods>
  } & AccessToken
  type CustomEndpointFn = (params: CustomEndpointParams) => Promise<any>

  type DeleteParams = AccessToken & DriveSpecification & ItemSpecifiation;
  type DeleteFn = (params: DeleteParams) => Promise<void>;

  type ThumbnailsParams = AccessToken & DriveSpecification & ItemSpecifiation & Partial<ODataQueryParamaters>;
  type ThumbnailsFn = (params: ThumbnailsParams) => Promise<{
    value: ThumbnailSet[]
  }>

  type PreviewParams = {
    body?: {
      page?: string,
      zoom?: number
    }
  } & AccessToken & DriveSpecification & ItemSpecifiation;
  type PreviewFn = (params: PreviewParams) => Promise<ItemPreviewInfo>


  type CreateLinkBody = {
    password?: string,
    expirationDateTime?: string,
    retainInheritedPermissions?: boolean,
    scope?: "anonymous" | "organization" | "users"
  }
  type CreateLinkParams = {
    type?: "view" | "edit" | "embed",
    body?: CreateLinkBody
  } & AccessToken & DriveSpecification & ItemSpecifiation;
  type CreateLinkFn = (params: CreateLinkParams) => Promise<Permission>

  export const items: {
    listChildren: ListChildrenFn,
    createFolder: CreateFolderFn,
    uploadSimple: UploadSimpleFn,
    uploadSession: UploadSessionFn,
    update: UpdateFn,
    getMetadata: GetMetadataFn,
    download: DownloadFn,
    partialDownload: PartialDownloadFn,
    sync: SyncFn,
    customEndpoint: CustomEndpointFn,
    delete: DeleteFn,
    thumbnails: ThumbnailsFn,
    preview: PreviewFn,
    createLink: CreateLinkFn
  };
}

export default oneDriveAPI;
