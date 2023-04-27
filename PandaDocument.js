class PandaDocument {
    constructor(data) {
      this.linked_objects = data.linked_objects;
      this.date_completed = data.date_completed;
      this.id = data.id;
      this.name = data.name;
      this.autonumbering_sequence_name_prefix = data.autonumbering_sequence_name_prefix;
      this.date_created = data.date_created;
      this.date_modified = data.date_modified;
      this.created_by = new CreatedBy(data.created_by);
      this.template = new Template(data.template);
      this.expiration_date = data.expiration_date;
      this.metadata = data.metadata;
      this.tokens = data.tokens.map(token => new Token(token));
      this.fields = data.fields.map(field => new Field(field));
      this.pricing = new Pricing(data.pricing);
    }
  }
  
  class CreatedBy {
    constructor(data) {
      this.id = data.id;
      this.email = data.email;
      this.first_name = data.first_name;
      this.last_name = data.last_name;
      this.avatar = data.avatar;
      this.membership_id = data.membership_id;
    }
  }
  
  class Template {
    constructor(data) {
      this.id = data.id;
      this.name = data.name;
    }
  }
  
  class Token {
    constructor(data) {
      this.name = data.name;
      this.value = data.value;
    }
  }
  
class Field {
    constructor(data) {
      this.uuid = data.uuid;
      this.name = data.name;
      this.title = data.title;
      this.placeholder = data.placeholder;
      this.value = data.value;
      this.assigned_to = new AssignedTo(data.assigned_to);
      this.field_id = data.field_id;
      this.type = data.type;
      this.merge_field = data.merge_field;
    }
  }
  
  class AssignedTo {
    constructor(data) {
      this.id = data.id;
      this.first_name = data.first_name;
      this.last_name = data.last_name;
      this.email = data.email;
      this.recipient_type = data.recipient_type;
      this.has_completed = data.has_completed;
      this.role = data.role;
      this.roles = data.roles;
      this.signing_order = data.signing_order;
      this.type = data.type;
    }
  }
  
  class Pricing {
    constructor(data) {
      this.tables = data.tables.map(table => new PricingTable(table));
    }
  }
  
  class PricingTable {
    constructor(data) {
      this.name = data.name;
      this.id = data.id;
      this.total = data.total;
      this.is_included_in_total = data.is_included_in_total;
      this.summary = data.summary;
    }
  }
  

  module.exports = {PandaDocument, CreatedBy, Template, Token, Field, AssignedTo, Pricing, PricingTable};