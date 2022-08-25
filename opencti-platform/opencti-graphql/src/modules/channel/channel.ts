import channelTypeDefs from './channel.graphql';
import convertChannelToStix from './channel-converter';
import { NAME_FIELD, normalizeName } from '../../schema/identifier';
import { RELATION_TARGETS, RELATION_USES } from '../../schema/stixCoreRelationship';
import {
  ENTITY_TYPE_ATTACK_PATTERN,
  ENTITY_TYPE_IDENTITY_INDIVIDUAL,
  ENTITY_TYPE_IDENTITY_ORGANIZATION,
  ENTITY_TYPE_IDENTITY_SECTOR,
  ENTITY_TYPE_INFRASTRUCTURE,
  ENTITY_TYPE_LOCATION_CITY,
  ENTITY_TYPE_LOCATION_COUNTRY,
  ENTITY_TYPE_LOCATION_POSITION,
  ENTITY_TYPE_LOCATION_REGION,
  ENTITY_TYPE_MALWARE,
  ENTITY_TYPE_TOOL
} from '../../schema/stixDomainObject';
import channelResolvers from './channel-resolver';
import { ENTITY_TYPE_CHANNEL, StoreEntityChannel } from './channel-types';
import type { ModuleDefinition } from '../../types/module';
import { registerDefinition } from '../../types/module';
import { ENTITY_TYPE_LANGUAGE } from '../language/language-types';
import { ENTITY_TYPE_NARRATIVE } from '../narrative/narrative-types';
import { ENTITY_TYPE_EVENT } from '../event/event-types';
import {
  ENTITY_DOMAIN_NAME,
  ENTITY_HASHED_OBSERVABLE_STIX_FILE, ENTITY_HOSTNAME,
  ENTITY_TEXT,
  ENTITY_URL
} from '../../schema/stixCyberObservable';

const RELATION_AMPLIFIES = 'amplifies';
const RELATION_PUBLISHES = 'publishes';

const CHANNEL_DEFINITION: ModuleDefinition<StoreEntityChannel> = {
  type: {
    id: 'channels',
    name: ENTITY_TYPE_CHANNEL,
    category: 'StixDomainEntity',
    aliased: true
  },
  graphql: {
    schema: channelTypeDefs,
    resolver: channelResolvers,
  },
  identifier: {
    definition: {
      [ENTITY_TYPE_CHANNEL]: [{ src: NAME_FIELD }]
    },
    resolvers: {
      name(data: object) {
        return normalizeName(data);
      },
    },
  },
  attributes: [
    { name: 'name', type: 'string', multiple: false, upsert: true },
    { name: 'description', type: 'string', multiple: false, upsert: true },
    { name: 'channel_types', type: 'string', multiple: true, upsert: true },
  ],
  relations: [
    { name: RELATION_TARGETS,
      type: 'StixCoreRelationship',
      targets: [
        ENTITY_TYPE_IDENTITY_INDIVIDUAL,
        ENTITY_TYPE_IDENTITY_ORGANIZATION,
        ENTITY_TYPE_IDENTITY_SECTOR,
        ENTITY_TYPE_LOCATION_CITY,
        ENTITY_TYPE_LOCATION_COUNTRY,
        ENTITY_TYPE_LOCATION_POSITION,
        ENTITY_TYPE_LOCATION_REGION,
        ENTITY_TYPE_EVENT
      ] },
    { name: RELATION_USES,
      type: 'StixCoreRelationship',
      targets: [
        ENTITY_TYPE_INFRASTRUCTURE,
        ENTITY_TYPE_LANGUAGE,
        ENTITY_TYPE_NARRATIVE,
        ENTITY_TYPE_ATTACK_PATTERN,
        ENTITY_TYPE_MALWARE,
        ENTITY_TYPE_TOOL,
        ENTITY_TYPE_LANGUAGE,
      ] },
    { name: RELATION_PUBLISHES,
      type: 'StixCoreRelationship',
      targets: [
        ENTITY_HASHED_OBSERVABLE_STIX_FILE,
        ENTITY_URL,
        ENTITY_TEXT,
        ENTITY_DOMAIN_NAME,
        ENTITY_HOSTNAME,
      ] },
    { name: RELATION_AMPLIFIES, type: 'StixCoreRelationship', targets: [ENTITY_TYPE_CHANNEL] }
  ],
  converter: convertChannelToStix
};

registerDefinition(CHANNEL_DEFINITION);
