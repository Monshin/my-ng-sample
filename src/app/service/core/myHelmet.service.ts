import { Injectable, Inject } from '@angular/core';
import { Location, DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

import { environment } from 'src/environments/environment';

interface HtmlHelmetConfig {
  title?: string;
  disableTitleTemplate?: boolean;
  description?: string;
  keywords?: string;
  url?: string;
  type?: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  // appUrl?: string;
  // schemaData?: any;
}

@Injectable({
  providedIn: 'root',
})
export class MyHelmetService {
  private default: HtmlHelmetConfig;
  private metaElements: HTMLMetaElement[];

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private location: Location,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.default = {};
    this.metaElements = [];
  }

  public setDefault = (config: HtmlHelmetConfig) => {
    this.default = config;
    this.set({});
  };

  public set = (config: HtmlHelmetConfig) => {
    this.removeAllTag();
    const finalConfig = { ...this.default, ...config };
    const {
      title,
      disableTitleTemplate,
      description,
      keywords,
      url,
      type,
      image,
      imageWidth,
      imageHeight,
    } = finalConfig;

    const finalTitle = title
      ? disableTitleTemplate
        ? title
        : `${title} - ${environment.siteName}`
      : environment.siteName;
    const finalDescription = description ? description.substring(0, 200) : '';
    const finalUrl = `${environment.shareUrl}${url || this.location.path()}`;

    this.titleService.setTitle(finalTitle);
    this.metaElements.push(
      ...this.metaService.addTags([
        { name: 'description', content: finalDescription },
        { name: 'keywords', content: keywords },
        { property: 'og:site_name', content: environment.siteName },
        { property: 'og:locate', content: 'zh_tw' },
        { property: 'og:url', content: finalUrl },
        { property: 'og:title', content: finalTitle },
        { property: 'og:description', content: finalDescription },
        { property: 'og:type', content: type || 'website' },
      ])
    );
    if (image) {
      this.metaElements.push(
        this.metaService.addTag({
          property: 'og:image',
          content: image,
        })
      );
      if (imageWidth && imageWidth > 0) {
        this.metaElements.push(
          this.metaService.addTag({
            property: 'og:image:width',
            content: imageWidth.toString(),
          })
        );
      }
      if (imageHeight && imageHeight > 0) {
        this.metaElements.push(
          this.metaService.addTag({
            property: 'og:image:height',
            content: imageHeight.toString(),
          })
        );
      }
    }
  };

  protected removeAllTag = () => {
    if (this.metaElements && this.metaElements.length > 0) {
      this.metaElements.forEach((element) => {
        this.metaService.removeTagElement(element);
      });
      this.metaElements.length = 0;
    }
  };
}
