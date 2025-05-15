import type { ActionConfig } from '@hass/data/lovelace/config/action';
import type { PiHoleDevice } from '@type/types';
import type { Translation, TranslationKey } from './locale';

/**
 * Configuration settings for the pi-hole card
 */

export interface Config {
  /** Unique identifier for the device */
  device_id: string | string[];

  /** Card title */
  title?: string;

  /** Card icon */
  icon?: string;

  /** actions for stats boxes */
  stats?: SectionConfig;

  /** actions for info section */
  info?: SectionConfig;

  /** actions for controls */
  controls?: SectionConfig;

  /** The entities to exclude */
  exclude_entities?: string[];

  /** The sections to exclude */
  exclude_sections?: Sections[];

  /** The order in which entities should be displayed */
  entity_order?: string[];
}
export type Sections =
  | 'header'
  | 'statistics'
  | 'sensors'
  | 'controls'
  | 'footer';

export interface SectionConfig {
  /** Action to perform on tap */
  tap_action?: ActionConfig;

  /** Action to perform on hold */
  hold_action?: ActionConfig;

  /** Action to perform on double tap */
  double_tap_action?: ActionConfig;
}

export interface DashboardStatConfig extends StatBoxConfig {
  /** Key of the sensor in the PiHoleDevice */
  sensorKey: keyof PiHoleDevice;
}

export interface StatBoxConfig {
  /** Title of the stat box */
  title: TranslationKey;

  /** The entity to display */
  footer: TranslationKey | Translation;

  /** The element to attach the action to */
  className: string;

  /** Icon name for the background (mdi icon) */
  icon: string;
}
