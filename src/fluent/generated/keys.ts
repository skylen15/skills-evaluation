import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: '62ef218cdcdd4f20a19f3bc13d241218'
                    }
                    'cert-acquisition-create-se-admin': {
                        table: 'sys_security_acl'
                        id: 'a97ff2711f73413f838e090f6527d66d'
                    }
                    'cert-acquisition-create-se-user-own': {
                        table: 'sys_security_acl'
                        id: 'e1ac52bea5304a23ac3074c7f7e4c438'
                    }
                    'cert-acquisition-delete-se-admin': {
                        table: 'sys_security_acl'
                        id: '60ffbab0b1d04c17b1caf3d2d0eba4e6'
                    }
                    'cert-acquisition-delete-se-user-own': {
                        table: 'sys_security_acl'
                        id: '9f3d390c13ce40dfad5ae1df455497ef'
                    }
                    'cert-acquisition-field-read': {
                        table: 'sys_security_acl'
                        id: '020c8cc7db774a49b29dcaef044421e1'
                    }
                    'cert-acquisition-field-write': {
                        table: 'sys_security_acl'
                        id: 'c4e9be0544c24a2eb12587aa45bafcdf'
                    }
                    'cert-acquisition-read-se-admin': {
                        table: 'sys_security_acl'
                        id: '675c2c6f247045f69f3688fd28dc9f77'
                    }
                    'cert-acquisition-read-se-user-own': {
                        table: 'sys_security_acl'
                        id: '7cb0ea00e8c948d89254f26106375d29'
                    }
                    'cert-acquisition-related-list-control': {
                        table: 'sys_ui_list_control'
                        id: '53434dfc52814558870366ed22c61356'
                    }
                    'cert-acquisition-write-se-admin': {
                        table: 'sys_security_acl'
                        id: '80afae9c59da45c990b5a14d6e9408f9'
                        deleted: true
                    }
                    'cert-acquisition-write-se-user-own': {
                        table: 'sys_security_acl'
                        id: '0e6da5983e5448d5b0040db511c4d221'
                        deleted: true
                    }
                    'certificate-application-developer': {
                        table: 'x_711398_se_certificate'
                        id: '3e23d94badd34acc95ddce900819144e'
                    }
                    'certificate-create-se-admin': {
                        table: 'sys_security_acl'
                        id: '0936a921c5fd47d4a5bfbd16cfc43810'
                    }
                    'certificate-delete-se-admin': {
                        table: 'sys_security_acl'
                        id: 'fee7f2b5856741e2a05818e5dff5a8e2'
                    }
                    'certificate-field-read': {
                        table: 'sys_security_acl'
                        id: '1df1e2cfc5ed441382717236265d87c3'
                    }
                    'certificate-field-write': {
                        table: 'sys_security_acl'
                        id: 'bcae67a6a1464b87bac57bc16b245cd2'
                    }
                    'certificate-implementation-specialist-itsm': {
                        table: 'x_711398_se_certificate'
                        id: '250c8c4225ce4662b0801b76f48b43ed'
                    }
                    'certificate-read-se-user': {
                        table: 'sys_security_acl'
                        id: 'ec29ee65edb349d3a05338b55913a496'
                    }
                    'certificate-system-administrator': {
                        table: 'x_711398_se_certificate'
                        id: '66d65426f9724e309a30ef4d996acf29'
                    }
                    'certificate-write-se-admin': {
                        table: 'sys_security_acl'
                        id: '0206fb7425844194a6cd7498fffbf753'
                    }
                    'generate-skill-assessments': {
                        table: 'sys_script'
                        id: '77fa36e056684782b6adc446b218e498'
                    }
                    'level-advanced': {
                        table: 'x_711398_se_level'
                        id: '6752531799bd469386dd8d3514617775'
                    }
                    'level-create-se-admin': {
                        table: 'sys_security_acl'
                        id: '8729350989954f60b8d73a038f533bbd'
                    }
                    'level-delete-se-admin': {
                        table: 'sys_security_acl'
                        id: '806eeb8b7fbb47b9b6eda692fd9d91ef'
                    }
                    'level-elementary': {
                        table: 'x_711398_se_level'
                        id: 'df917ad9cdd1499dac4a116e17a4cf51'
                    }
                    'level-field-read': {
                        table: 'sys_security_acl'
                        id: '2612bdb38f67437391717bbeb310fead'
                    }
                    'level-field-write': {
                        table: 'sys_security_acl'
                        id: 'ea8fcc39a368438aadc4451f73ae79f4'
                    }
                    'level-intermediate': {
                        table: 'x_711398_se_level'
                        id: 'd041bcf1877e4756b0265a8724ebaef9'
                    }
                    'level-pre-intermediate': {
                        table: 'x_711398_se_level'
                        id: 'eca1a2436cce4a6fbe72bcc98b76f945'
                    }
                    'level-read-se-user': {
                        table: 'sys_security_acl'
                        id: '733b04b1b3a3427c897287796d623233'
                    }
                    'level-upper-intermediate': {
                        table: 'x_711398_se_level'
                        id: 'f3aad16440e948a8b1ad1c7eeb0a9627'
                    }
                    'level-write-se-admin': {
                        table: 'sys_security_acl'
                        id: 'a6646c1224b54c80878abade5b9cb677'
                    }
                    'module-all-submissions': {
                        table: 'sys_app_module'
                        id: '190e4ed9327a4574b6940406381e8f6d'
                    }
                    'module-awaiting-approval': {
                        table: 'sys_app_module'
                        id: '4ff6e4b4bd6b4751941406d5b4caa661'
                    }
                    'module-certificates': {
                        table: 'sys_app_module'
                        id: '6a75fd5468574daa89ca3c05930398f2'
                    }
                    'module-levels': {
                        table: 'sys_app_module'
                        id: '207fb5ba999d4d2389f7a7764997371c'
                    }
                    'module-my-skill-evaluations': {
                        table: 'sys_app_module'
                        id: '613df45db88b48179974aeb85327eec7'
                    }
                    'module-new-evaluation': {
                        table: 'sys_app_module'
                        id: '4bae798d336746db83d843997a815f3e'
                    }
                    'module-product-lines': {
                        table: 'sys_app_module'
                        id: '74a363a8ac58492eaaee28f689813eca'
                    }
                    'module-se-admin-separator': {
                        table: 'sys_app_module'
                        id: '0e7d01620b7542148fede66bb7bc1c96'
                    }
                    'module-skills': {
                        table: 'sys_app_module'
                        id: '367435b472f14fcba90f1d71ebfba198'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '25530048efc74f06bba6e430da5a5cc0'
                    }
                    'pm-approve-submission': {
                        table: 'sys_ui_action'
                        id: '2873cba923a442daaacf36796847cd50'
                    }
                    'pm-reject-submission': {
                        table: 'sys_ui_action'
                        id: '04d6a7685c244e90a07719dda70bef82'
                    }
                    'product-line-business-apps': {
                        table: 'x_711398_se_product_line'
                        id: '127ec22b73644500bdbc17b5b53bb640'
                    }
                    'product-line-create-se-admin': {
                        table: 'sys_security_acl'
                        id: '09d817ba50d74996836da1685f811b13'
                    }
                    'product-line-delete-se-admin': {
                        table: 'sys_security_acl'
                        id: '107f5d7f31cb4b7ab8616b3a566e387d'
                    }
                    'product-line-field-read': {
                        table: 'sys_security_acl'
                        id: '434a2fa564d7425490869d054f837e77'
                    }
                    'product-line-field-write': {
                        table: 'sys_security_acl'
                        id: 'eb12a932d3b746a999b4223a2cb593e5'
                    }
                    'product-line-itsm': {
                        table: 'x_711398_se_product_line'
                        id: '8f6092b53773486d91ad01bf461705bc'
                    }
                    'product-line-platform': {
                        table: 'x_711398_se_product_line'
                        id: 'e70f6ac6274f4a81ad6cda2486b5af5b'
                    }
                    'product-line-read-se-user': {
                        table: 'sys_security_acl'
                        id: '6d52c0ed5fb7452e9dae37bd1130ae9e'
                    }
                    'product-line-write-se-admin': {
                        table: 'sys_security_acl'
                        id: 'b3fbef6b862e494fad7800a971d71f42'
                    }
                    'recalculate-submission-score': {
                        table: 'sys_script'
                        id: '467e29b2730047cebdc83d408d9ceb29'
                    }
                    'refuse-duplicate-cert-acquisition': {
                        table: 'sys_script'
                        id: '713a468e09cc42ddae99018e2e6b177c'
                    }
                    'refuse-extra-skill-assessment-insert': {
                        table: 'sys_script'
                        id: '17e999c42ca84140bd178658dfaf228d'
                    }
                    'refuse-in-progress-insert': {
                        table: 'sys_script'
                        id: '70183ee27b3440ec9490d2d340592c20'
                    }
                    'restrict-member-cert-acquisition-query': {
                        table: 'sys_script'
                        id: '982ea36a5c5c4a0b9254c2ffe15b23a8'
                    }
                    'restrict-member-skill-assessment-query': {
                        table: 'sys_script'
                        id: '68f80942510b40bc8e5d7c67c92bf91e'
                    }
                    'restrict-member-submission-query': {
                        table: 'sys_script'
                        id: 'd573187f21b04502bd65ef53bd2f8fd2'
                    }
                    'skill-assessment-create-se-user': {
                        table: 'sys_security_acl'
                        id: 'fd063724a7d8455e86d9dc6b174ccee1'
                    }
                    'skill-assessment-delete-se-admin': {
                        table: 'sys_security_acl'
                        id: 'cdfa89efd41a4fbe946eb3c6f60c4ead'
                    }
                    'skill-assessment-field-read': {
                        table: 'sys_security_acl'
                        id: '2bbd27a151e14a6eb11bef874ff214dd'
                    }
                    'skill-assessment-field-write': {
                        table: 'sys_security_acl'
                        id: '2a4cfe4d140b465cbc619744b60456f1'
                    }
                    'skill-assessment-read-se-admin': {
                        table: 'sys_security_acl'
                        id: '5824f86147f04a8b8fee001b38a42d59'
                    }
                    'skill-assessment-read-se-user-own': {
                        table: 'sys_security_acl'
                        id: '53a1db4ee771477dacb2466697dcf4e2'
                    }
                    'skill-assessment-related-list-control': {
                        table: 'sys_ui_list_control'
                        id: '714fb5eb3e614ba295e527bc052e83e4'
                    }
                    'skill-assessment-write-se-admin': {
                        table: 'sys_security_acl'
                        id: 'fda859a08bc148b689e574fa5e36077c'
                    }
                    'skill-assessment-write-se-user-own': {
                        table: 'sys_security_acl'
                        id: 'e67e24ce275147088bfd31f684cee356'
                    }
                    'skill-create-se-admin': {
                        table: 'sys_security_acl'
                        id: '4258714bf1f04811a6185c034f19a53c'
                    }
                    'skill-delete-se-admin': {
                        table: 'sys_security_acl'
                        id: 'b2929645cb78426cbcd2762e805f2796'
                    }
                    'skill-design-application': {
                        table: 'x_711398_se_skill'
                        id: 'b0a3124982374856b25621ddefc80d53'
                    }
                    'skill-evaluation-coe-group': {
                        table: 'sys_user_group'
                        id: '971081b9dd5f4919874b67e26130ec90'
                    }
                    'skill-evaluation-coe-has-se-admin': {
                        table: 'sys_group_has_role'
                        id: '820cd159d43c472eac642abcb0880863'
                    }
                    'skill-evaluation-menu': {
                        table: 'sys_app_application'
                        id: '2a20c409bc2240948dc7ee4747de4df4'
                    }
                    'skill-evaluation-pm-group': {
                        table: 'sys_user_group'
                        id: '1d51cb38732040bb976b07ffb0631c84'
                    }
                    'skill-evaluation-pm-has-se-admin': {
                        table: 'sys_group_has_role'
                        id: 'f1948554de864c40baf89f9d66b8472e'
                    }
                    'skill-evaluation-user-group': {
                        table: 'sys_user_group'
                        id: 'bbf2b5b2e7f94564bacf7d7e7818eea8'
                    }
                    'skill-evaluation-user-has-se-user': {
                        table: 'sys_group_has_role'
                        id: 'e20112645a984902b12b5c54fba62809'
                    }
                    'skill-field-read': {
                        table: 'sys_security_acl'
                        id: '71120fcafed14224a983a2a1f117597e'
                    }
                    'skill-field-write': {
                        table: 'sys_security_acl'
                        id: '6bc106299796446d9edfdbb2dd02ad2e'
                    }
                    'skill-implement-security': {
                        table: 'x_711398_se_skill'
                        id: '3d931b0e0b76485a9dac3d7d65b3b78a'
                    }
                    'skill-itsm-process': {
                        table: 'x_711398_se_skill'
                        id: '8ffe0cf2dc5c4b009fe24cae9860e35c'
                    }
                    'skill-platform-architecture': {
                        table: 'x_711398_se_skill'
                        id: '08ae46c2499f4a44b80638ee9e19b951'
                    }
                    'skill-read-se-user': {
                        table: 'sys_security_acl'
                        id: '16cd205884064dc095112c7db06208a5'
                    }
                    'skill-write-scripts': {
                        table: 'x_711398_se_skill'
                        id: 'ab37e817a58c41cd87cf135006a1e4d9'
                    }
                    'skill-write-se-admin': {
                        table: 'sys_security_acl'
                        id: '68d6f8e721914284b22f2516ede2e57a'
                    }
                    'src_server_access-roles_ts': {
                        table: 'sys_module'
                        id: 'a84152ec5527418ba88189595418a05b'
                    }
                    'src_server_generate-skill-assessments_ts': {
                        table: 'sys_module'
                        id: '2142872a408a4f5586318c538e19bc25'
                    }
                    'src_server_group-names_ts': {
                        table: 'sys_module'
                        id: '04e94114ec43446aa51ddc0b77121a59'
                    }
                    src_server_prelude_ts: {
                        table: 'sys_module'
                        id: 'ff3047c022b5468697a49dbcfffa9ea0'
                    }
                    'src_server_recalculate-submission-score_ts': {
                        table: 'sys_module'
                        id: 'b56d5644e7c446cea30b453b38c1e90f'
                    }
                    'src_server_refuse-duplicate-cert-acquisition_ts': {
                        table: 'sys_module'
                        id: '1a39610c6064443d80f4bbf6d179f3bc'
                    }
                    'src_server_refuse-extra-skill-assessment-insert_ts': {
                        table: 'sys_module'
                        id: 'f952e6b81a1c47709ca79d504cc71f0f'
                    }
                    'src_server_refuse-in-progress-insert_ts': {
                        table: 'sys_module'
                        id: 'c3a190f029ed473ea7a8967bcb539685'
                    }
                    'src_server_restrict-member-cert-acquisition-query_ts': {
                        table: 'sys_module'
                        id: 'dbe7365aaec94ff3a18a918d68618075'
                    }
                    'src_server_restrict-member-skill-assessment-query_ts': {
                        table: 'sys_module'
                        id: 'cd7053116147401f9232af1a99598486'
                    }
                    'src_server_restrict-member-submission-query_ts': {
                        table: 'sys_module'
                        id: 'ec4baab63539417283f3f63c9683e743'
                    }
                    'src_server_submission-policy_ts': {
                        table: 'sys_module'
                        id: 'e58387ead6be4440a382432a0bd3a611'
                    }
                    'src_server_submit-for-review_ts': {
                        table: 'sys_module'
                        id: '0a775208fe4941aba9f2a3c83a3215c8'
                    }
                    'src_server_take-pm-gate_ts': {
                        table: 'sys_module'
                        id: 'fa0e0bc980944bfca45887f536535976'
                    }
                    'submission-cert-acquisition-related-list': {
                        table: 'sys_ui_related_list_entry'
                        id: 'e2f290ef46cb4a11a56a8776a9450f2e'
                    }
                    'submission-create-se-user': {
                        table: 'sys_security_acl'
                        id: '196d625188dd4aa0a13302fba9044219'
                    }
                    'submission-delete-se-admin': {
                        table: 'sys_security_acl'
                        id: 'c39add822b004d2aadf4737ff5065727'
                    }
                    'submission-description-write-se-admin': {
                        table: 'sys_security_acl'
                        id: 'a5fc75ddf82e4866bfd020b61c56c8a6'
                    }
                    'submission-description-write-se-user-own': {
                        table: 'sys_security_acl'
                        id: '653130d7a82f46d8857733e0feae1964'
                    }
                    'submission-field-read': {
                        table: 'sys_security_acl'
                        id: '4a2573458a924ce2a14dfe0ab62439a2'
                    }
                    'submission-field-write': {
                        table: 'sys_security_acl'
                        id: '7e8f4a533bde4a37928f601263a9e186'
                    }
                    'submission-read-se-admin': {
                        table: 'sys_security_acl'
                        id: '0051e77763fc4139b5ae604177150bcf'
                    }
                    'submission-read-se-user-own': {
                        table: 'sys_security_acl'
                        id: 'e66d7454174b4f12bce18b57191b3157'
                    }
                    'submission-related-lists': {
                        table: 'sys_ui_related_list'
                        id: '49150dbe6fb145a6abd33b0542af603b'
                    }
                    'submission-skill-assessment-related-list': {
                        table: 'sys_ui_related_list_entry'
                        id: '6b8ca65d46a2401db2f72844c82bdaf0'
                    }
                    'submission-work-notes-write-se-admin': {
                        table: 'sys_security_acl'
                        id: 'a5f2a45a2a07422589cc760bd8fae241'
                    }
                    'submission-work-notes-write-se-user-own': {
                        table: 'sys_security_acl'
                        id: 'de4a33e19f214ab9975c47d6411f31ee'
                    }
                    'submission-write-se-admin': {
                        table: 'sys_security_acl'
                        id: '0c3f9a4b52f94fe38cbaf4a443797423'
                    }
                    'submission-write-se-user-own': {
                        table: 'sys_security_acl'
                        id: '1171dc648ae646dba6ef7c4fa715e326'
                    }
                    'submit-for-review': {
                        table: 'sys_ui_action'
                        id: 'eca8ad8c42274843afc9ca351218af56'
                    }
                }
                composite: [
                    {
                        table: 'sys_ui_list'
                        id: '025525edbe524c8f8f978924a1519903'
                        key: {
                            name: 'x_711398_se_skill_assessment'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                            element: 'NULL'
                            relationship: 'NULL'
                            parent: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '0266de608a3941748ab413c7afc9c6bf'
                        key: {
                            name: 'x_711398_se_skill_assessment'
                            element: 'proficiency_level'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '0269ab678a014ac3a5b00a03bbc881c1'
                        key: {
                            sys_security_acl: '6d52c0ed5fb7452e9dae37bd1130ae9e'
                            sys_user_role: {
                                id: '510864fdf2b84952a7595fe5e602132e'
                                key: {
                                    name: 'x_711398_se.se_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '03530c06d9914756a1df530ba1ccb6a1'
                        key: {
                            sys_security_acl: '0206fb7425844194a6cd7498fffbf753'
                            sys_user_role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '0727fb7d83f34f01825260374ff22d70'
                        key: {
                            list_id: {
                                id: '28bb75635f54414290c1e10f72171546'
                                key: {
                                    name: 'x_711398_se_cert_acquisition'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'certificate'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '08cb583e26fd4f53ab82b216ef75e54e'
                        key: {
                            list_id: {
                                id: 'cb3d4a0d6c1247b5b62a97a5b8430f4d'
                                key: {
                                    name: 'x_711398_se_submission'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '08e5d91949844bd8a9c0e1d540239877'
                        key: {
                            sys_security_acl: '16cd205884064dc095112c7db06208a5'
                            sys_user_role: {
                                id: '510864fdf2b84952a7595fe5e602132e'
                                key: {
                                    name: 'x_711398_se.se_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '094a4d7c96534ff79ca2223eb56e999a'
                        key: {
                            name: 'x_711398_se_submission'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: '0a8fee7400d64f7aa77954fe0dbc14f2'
                        key: {
                            name: 'x_711398_se_certificate'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '0aab9631b7ec416eb0d60377cb8fb72d'
                        key: {
                            category: 'x_711398_se_submission'
                            prefix: 'SUBM'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '0caed99076c74cb4b531cfa6031fc025'
                        key: {
                            sys_security_acl: 'fda859a08bc148b689e574fa5e36077c'
                            sys_user_role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0cf5c06cd68e4e2fbb2d8927b118438d'
                        key: {
                            name: 'x_711398_se_submission'
                            element: 'state'
                            value: 'completed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '0ef2bc0ae6df423f94803e5e27b02318'
                        key: {
                            sys_ui_form: {
                                id: '0f0a119a792b484989d1f3481cca836a'
                                key: {
                                    name: 'x_711398_se_product_line'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '853255a1828746df8d10d070cfb26cc6'
                                key: {
                                    name: 'x_711398_se_product_line'
                                    caption: 'Product Line'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: '0f0a119a792b484989d1f3481cca836a'
                        key: {
                            name: 'x_711398_se_product_line'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: '0f40c45715774aa38a30610e36f51764'
                        deleted: true
                        key: {
                            ui_policy: {
                                id: '3f58c16dc8e14ef59e20b59e29a78ea4'
                                key: {
                                    table: 'x_711398_se_submission'
                                    short_description: 'Lock Description and Work notes after leaving Draft'
                                }
                            }
                            field: 'work_notes'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '101c0483fbe14947a5324877aad7c827'
                        key: {
                            name: 'x_711398_se_skill_assessment'
                            element: 'proficiency_level'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '104f162c3f4c49be89d694fb75b46a09'
                        key: {
                            list_id: {
                                id: '025525edbe524c8f8f978924a1519903'
                                key: {
                                    name: 'x_711398_se_skill_assessment'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'skill.product_line'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: '10d22a8d39b34b2aa6f6ac12f8da8cea'
                        key: {
                            name: 'x_711398_se_cert_acquisition'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '16169fdc7cf44976bd868c32d92b1c7d'
                        key: {
                            name: 'x_711398_se_submission'
                            element: 'assigned_to'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '1745bf4281c84cd99e2d6a42f6e0b766'
                        key: {
                            sys_security_acl: '1171dc648ae646dba6ef7c4fa715e326'
                            sys_user_role: {
                                id: '510864fdf2b84952a7595fe5e602132e'
                                key: {
                                    name: 'x_711398_se.se_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '17b8d75dbe014d57bfbdd66e22530385'
                        key: {
                            name: 'x_711398_se_level'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '17e7bcdded74478e98fa8715fa1090df'
                        key: {
                            sys_security_acl: 'ea8fcc39a368438aadc4451f73ae79f4'
                            sys_user_role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '18aeaf129b6d4d4db68d8124e755e9e7'
                        key: {
                            name: 'x_711398_se_certificate'
                            element: 'product_line'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '18b66100f83a46ccb6163e6c9472c750'
                        key: {
                            name: 'x_711398_se_product_line'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '19a05d2864e142c29a6f30056fd65602'
                        key: {
                            name: 'x_711398_se_skill_assessment'
                            element: 'submission'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '1a4cf8fb6119449cbd79e360d0a81fa6'
                        key: {
                            list_id: {
                                id: '3bb01c449a8f4ea2b443f8189dd4fdae'
                                key: {
                                    name: 'x_711398_se_certificate'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'product_line'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1c3490cc26b945eaaf5ed608a4de9445'
                        key: {
                            name: 'x_711398_se_submission'
                            element: 'valid'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1c4a7f10e8464405be57a19196de7168'
                        key: {
                            name: 'x_711398_se_cert_acquisition'
                            element: 'certificate'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1e067aac4576437ebc3f77ac276757a6'
                        key: {
                            name: 'x_711398_se_certificate'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '1eb1174f989f4ba28c2e75899c2f3dff'
                        key: {
                            name: 'x_711398_se_submission'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: '1fb27ff51da74d79b747bd8e1f4e8a96'
                        key: {
                            ui_policy: {
                                id: 'cba23b3140394579bf126049875730ef'
                                key: {
                                    table: 'x_711398_se_submission'
                                    short_description: 'Lock Description after leaving Draft'
                                }
                            }
                            field: 'description'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: '1fc7bcd96f9d4a46bb1402ccc4943a84'
                        deleted: true
                        key: {
                            ui_policy: {
                                id: '3f58c16dc8e14ef59e20b59e29a78ea4'
                                key: {
                                    table: 'x_711398_se_submission'
                                    short_description: 'Lock Description and Work notes after leaving Draft'
                                }
                            }
                            field: 'description'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2077dd896e5243fc9b7d4b06aa0e62aa'
                        key: {
                            name: 'x_711398_se_skill'
                            element: 'weight'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '217a2ba4e70f4fa598724ae600345c02'
                        key: {
                            sys_ui_form: {
                                id: '8278bff5d98b418ba07d86fc3a3d0dc4'
                                key: {
                                    name: 'x_711398_se_skill'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '69d13124c7974ac59866ef3b1f1f58f2'
                                key: {
                                    name: 'x_711398_se_skill'
                                    caption: 'Skill'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: '218fb87fc32f42d8ab10bdf7e186e049'
                        key: {
                            name: 'x_711398_se_submission'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2255be1517d04a2796f22af6ad439ce7'
                        key: {
                            name: 'x_711398_se_product_line'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '261bc4d142ce40f9bfc181df8dc4f165'
                        key: {
                            sys_security_acl: 'b2929645cb78426cbcd2762e805f2796'
                            sys_user_role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '26972df14e9c418ebddc6f0612a67877'
                        key: {
                            name: 'x_711398_se_submission'
                            element: 'work_notes'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '26a6b8b95c234ef1babb93b4fe18852b'
                        key: {
                            sys_ui_section: {
                                id: '71923a1e850b44f79a9f4e873f0adb6e'
                                key: {
                                    name: 'x_711398_se_submission'
                                    caption: 'Submission'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '9'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: '2752d01d52954f92b7e32dfe0ec2f92f'
                        key: {
                            ui_policy: {
                                id: 'dd8922fa5cc5450e9936814a26aac5e9'
                                key: {
                                    table: 'x_711398_se_submission'
                                    short_description: 'Members may edit only Description and Work notes'
                                }
                            }
                            field: 'score'
                        }
                    },
                    {
                        table: 'sys_ui_list'
                        id: '28bb75635f54414290c1e10f72171546'
                        key: {
                            name: 'x_711398_se_cert_acquisition'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                            element: 'NULL'
                            relationship: 'NULL'
                            parent: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2928a204e5e84e03af9b0c51afbc5e34'
                        key: {
                            name: 'x_711398_se_cert_acquisition'
                            element: 'submission'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '2a9d1fff841948e3af7f98440c67b045'
                        key: {
                            list_id: {
                                id: '5bdf81138bbc4ac9b0a819c5ed79fcc8'
                                key: {
                                    name: 'x_711398_se_skill'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '2d209c9b1a4a4a91bf7a2164e78c7fb0'
                        key: {
                            sys_security_acl: '60ffbab0b1d04c17b1caf3d2d0eba4e6'
                            sys_user_role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '2f3c851a735043888350e828d5ded9fd'
                        key: {
                            sys_ui_section: {
                                id: '853255a1828746df8d10d070cfb26cc6'
                                key: {
                                    name: 'x_711398_se_product_line'
                                    caption: 'Product Line'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'name'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2ff2d064547f402ba732622eb3cf117d'
                        key: {
                            name: 'x_711398_se_submission'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3046aedc5c034f27a5285c95361be625'
                        key: {
                            name: 'x_711398_se_skill_assessment'
                            element: 'proficiency_level'
                            value: '0'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '31514fc148f24825a3a7b0f2d71101b6'
                        key: {
                            sys_ui_section: {
                                id: '71923a1e850b44f79a9f4e873f0adb6e'
                                key: {
                                    name: 'x_711398_se_submission'
                                    caption: 'Submission'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'number'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '3398b756d74e4f33972f1936bc78cdf9'
                        key: {
                            sys_ui_section: {
                                id: '71923a1e850b44f79a9f4e873f0adb6e'
                                key: {
                                    name: 'x_711398_se_submission'
                                    caption: 'Submission'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'assigned_to'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '33d16f1f403a43d9ab2d1b275bd30151'
                        key: {
                            sys_ui_section: {
                                id: '69d13124c7974ac59866ef3b1f1f58f2'
                                key: {
                                    name: 'x_711398_se_skill'
                                    caption: 'Skill'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '350fa0bb2bc44b88add211d9dda34040'
                        key: {
                            name: 'x_711398_se_certificate'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '35422c4f669b4da3a0ac27afd2420609'
                        key: {
                            name: 'x_711398_se_skill_assessment'
                            element: 'proficiency_level'
                            value: '2'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '36cd1674d51544459817de08d4eb2cba'
                        key: {
                            name: 'x_711398_se_submission'
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '36d7a64b3ff444d196f66a7ad582add7'
                        key: {
                            sys_ui_section: {
                                id: '71923a1e850b44f79a9f4e873f0adb6e'
                                key: {
                                    name: 'x_711398_se_submission'
                                    caption: 'Submission'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'description'
                            position: '10'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '377813e4fdbf4bed8a0dc1e19b4e58f4'
                        key: {
                            sys_security_acl: 'e66d7454174b4f12bce18b57191b3157'
                            sys_user_role: {
                                id: '510864fdf2b84952a7595fe5e602132e'
                                key: {
                                    name: 'x_711398_se.se_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '3797e8c6688f4f7bba68ffb6b7dad85e'
                        key: {
                            list_id: {
                                id: '025525edbe524c8f8f978924a1519903'
                                key: {
                                    name: 'x_711398_se_skill_assessment'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'skill'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '388274647d674e8099d24876d85bb35d'
                        key: {
                            list_id: {
                                id: '025525edbe524c8f8f978924a1519903'
                                key: {
                                    name: 'x_711398_se_skill_assessment'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'proficiency_level'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3919ceaf93b641259b73d9d3d1640f7b'
                        key: {
                            name: 'x_711398_se_skill'
                            element: 'product_line'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '393f3f6bd82d46a3b87fa0e3b96fd942'
                        key: {
                            sys_security_acl: '434a2fa564d7425490869d054f837e77'
                            sys_user_role: {
                                id: '510864fdf2b84952a7595fe5e602132e'
                                key: {
                                    name: 'x_711398_se.se_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3aaf456590724aa3a54d74b9071cc9e2'
                        key: {
                            name: 'x_711398_se_certificate'
                            element: 'product_line'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3ab99f2b51f14047b5f7d591015396bf'
                        key: {
                            name: 'x_711398_se_submission'
                            element: 'state'
                            value: 'reviewed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '3b2c4ad45d1448ba88203ecf3b09c5b1'
                        key: {
                            logical_table_name: 'x_711398_se_submission'
                            col_name_string: 'assigned_to'
                        }
                    },
                    {
                        table: 'sys_ui_list'
                        id: '3bb01c449a8f4ea2b443f8189dd4fdae'
                        key: {
                            name: 'x_711398_se_certificate'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                            element: 'NULL'
                            relationship: 'NULL'
                            parent: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '3c10c0c48bf34b7485dc546f43b251b1'
                        key: {
                            sys_security_acl: 'de4a33e19f214ab9975c47d6411f31ee'
                            sys_user_role: {
                                id: '510864fdf2b84952a7595fe5e602132e'
                                key: {
                                    name: 'x_711398_se.se_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '3d180b237afc4bd59eb6b970e105f399'
                        key: {
                            sys_security_acl: 'ec29ee65edb349d3a05338b55913a496'
                            sys_user_role: {
                                id: '510864fdf2b84952a7595fe5e602132e'
                                key: {
                                    name: 'x_711398_se.se_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '3dd48c9ca0fa4051acfcfa258800b406'
                        deleted: true
                        key: {
                            sys_security_acl: '0e6da5983e5448d5b0040db511c4d221'
                            sys_user_role: {
                                id: '510864fdf2b84952a7595fe5e602132e'
                                key: {
                                    name: 'x_711398_se.se_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '3e08e51c84ca40d982e32e85a7c4f356'
                        key: {
                            sys_security_acl: 'e67e24ce275147088bfd31f684cee356'
                            sys_user_role: {
                                id: '510864fdf2b84952a7595fe5e602132e'
                                key: {
                                    name: 'x_711398_se.se_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_policy'
                        id: '3f58c16dc8e14ef59e20b59e29a78ea4'
                        deleted: true
                        key: {
                            table: 'x_711398_se_submission'
                            short_description: 'Lock Description and Work notes after leaving Draft'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3f69f09dd8654ca3974821f3b074b5cf'
                        key: {
                            name: 'x_711398_se_submission'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '405a1a5d2c704cafb4e6468305d6982a'
                        key: {
                            sys_security_acl: '68d6f8e721914284b22f2516ede2e57a'
                            sys_user_role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '40f7a9719cf04b888d39795f52bf2dc6'
                        key: {
                            name: 'x_711398_se_product_line'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '4499f919895e4578be56809d823e0085'
                        key: {
                            logical_table_name: 'x_711398_se_skill_assessment'
                            col_name_string: 'submission,skill'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '455813e2904341f3b077c7965dcf050c'
                        key: {
                            sys_security_acl: 'c4e9be0544c24a2eb12587aa45bafcdf'
                            sys_user_role: {
                                id: '510864fdf2b84952a7595fe5e602132e'
                                key: {
                                    name: 'x_711398_se.se_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '46bf1641180347519dd343e9a447d7b7'
                        key: {
                            name: 'x_711398_se_skill'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '472e90d5e63b407a9ce0de00b76c1da7'
                        key: {
                            sys_security_acl: 'eb12a932d3b746a999b4223a2cb593e5'
                            sys_user_role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '48a003293ef844118d2b7194a7ce3e41'
                        key: {
                            name: 'x_711398_se_skill_assessment'
                            element: 'submission'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '4a15ac85abdc43178716dc29c91ecd00'
                        key: {
                            sys_ui_section: {
                                id: '69d13124c7974ac59866ef3b1f1f58f2'
                                key: {
                                    name: 'x_711398_se_skill'
                                    caption: 'Skill'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'product_line'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4b0416fb46144e5d892db45d4497bb81'
                        key: {
                            name: 'x_711398_se_skill_assessment'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4b2926b0e7894d1588ce18ae248e5781'
                        key: {
                            name: 'x_711398_se_cert_acquisition'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4c3fa15ba01a4a8298c4fffd402b97c3'
                        key: {
                            name: 'x_711398_se_certificate'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '4d1f690877e74fd08d0c7d4eb281d2e5'
                        key: {
                            sys_ui_section: {
                                id: '71923a1e850b44f79a9f4e873f0adb6e'
                                key: {
                                    name: 'x_711398_se_submission'
                                    caption: 'Submission'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'level'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '4dcc1327bbe6485e8997a5b1c8b6e81f'
                        key: {
                            sys_ui_section: {
                                id: '57e31fa2bb9345109934ce0f371c298d'
                                key: {
                                    name: 'x_711398_se_cert_acquisition'
                                    caption: 'Cert Acquisition'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'certificate.product_line'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4ddce81a7a964645b008e4445085bbbf'
                        key: {
                            name: 'x_711398_se_skill'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4fbef6ea109a412199a2f972587b4fbc'
                        key: {
                            name: 'x_711398_se_submission'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '4fdf4c74ff544d238920ef554b2be51d'
                        key: {
                            sys_security_acl: '0c3f9a4b52f94fe38cbaf4a443797423'
                            sys_user_role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4fe3b529cccd4d028a600952cc8f7359'
                        key: {
                            name: 'x_711398_se_submission'
                            element: 'valid'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_action_role'
                        id: '50434f6607914d21b49830ef71677a44'
                        key: {
                            sys_ui_action: '2873cba923a442daaacf36796847cd50'
                            sys_user_role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '5065284d72a44bf6b523cf3ee97109ac'
                        key: {
                            sys_security_acl: '2bbd27a151e14a6eb11bef874ff214dd'
                            sys_user_role: {
                                id: '510864fdf2b84952a7595fe5e602132e'
                                key: {
                                    name: 'x_711398_se.se_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_policy'
                        id: '506950b676054ff18489656b17ba2e5b'
                        key: {
                            table: 'x_711398_se_submission'
                            short_description: 'Hide Level while the Submission is Draft'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '510864fdf2b84952a7595fe5e602132e'
                        key: {
                            name: 'x_711398_se.se_user'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '533e4cbe57e54eec8a72bc903863404e'
                        key: {
                            list_id: {
                                id: 'cb3d4a0d6c1247b5b62a97a5b8430f4d'
                                key: {
                                    name: 'x_711398_se_submission'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'assigned_to'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '53b5d5b655b848d5b92ed96ca717ecd8'
                        key: {
                            name: 'x_711398_se_cert_acquisition'
                            element: 'submission'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '54ec944e24054d26b67c7446d6c0a84b'
                        key: {
                            sys_ui_section: {
                                id: '8c8c0b06ea894d8f866b3543694b5ce1'
                                key: {
                                    name: 'x_711398_se_level'
                                    caption: 'Level'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '551fb4d95a424c438ba92650af59a4a7'
                        key: {
                            name: 'x_711398_se_level'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '55d0269c71c04249a669347693dde61a'
                        key: {
                            name: 'x_711398_se_skill_assessment'
                            element: 'proficiency_level'
                            value: '4'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '564ec3d991174e86a90204f08bdde79f'
                        key: {
                            sys_security_acl: '9f3d390c13ce40dfad5ae1df455497ef'
                            sys_user_role: {
                                id: '510864fdf2b84952a7595fe5e602132e'
                                key: {
                                    name: 'x_711398_se.se_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '565659a3839f4aef87034849edfffb98'
                        key: {
                            sys_security_acl: '7cb0ea00e8c948d89254f26106375d29'
                            sys_user_role: {
                                id: '510864fdf2b84952a7595fe5e602132e'
                                key: {
                                    name: 'x_711398_se.se_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '570c4c2972f1454284149611c378ba7e'
                        key: {
                            list_id: {
                                id: 'd208da4e36fe4c119ee9636638bae741'
                                key: {
                                    name: 'x_711398_se_product_line'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '577489b1693640a38a2e7d538204309d'
                        key: {
                            name: 'x_711398_se_submission'
                            caption: 'Notes'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '57e31fa2bb9345109934ce0f371c298d'
                        key: {
                            name: 'x_711398_se_cert_acquisition'
                            caption: 'Cert Acquisition'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '58223ca4aa56463da638abdff81cc007'
                        key: {
                            sys_security_acl: 'a97ff2711f73413f838e090f6527d66d'
                            sys_user_role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '5a367442e14c45ac8ad8ea6330fefe07'
                        key: {
                            sys_security_acl: '2612bdb38f67437391717bbeb310fead'
                            sys_user_role: {
                                id: '510864fdf2b84952a7595fe5e602132e'
                                key: {
                                    name: 'x_711398_se.se_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '5aabb76b353e4ccab019dd11e35dc6bf'
                        key: {
                            sys_security_acl: '1df1e2cfc5ed441382717236265d87c3'
                            sys_user_role: {
                                id: '510864fdf2b84952a7595fe5e602132e'
                                key: {
                                    name: 'x_711398_se.se_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_list'
                        id: '5bdf81138bbc4ac9b0a819c5ed79fcc8'
                        key: {
                            name: 'x_711398_se_skill'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                            element: 'NULL'
                            relationship: 'NULL'
                            parent: 'NULL'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '5d1c9dbf5bf5453cb54da41ba7f92133'
                        key: {
                            name: 'x_711398_se_skill_assessment'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '606a3abe407840cfac7f4ba9e3df04d5'
                        key: {
                            sys_security_acl: '806eeb8b7fbb47b9b6eda692fd9d91ef'
                            sys_user_role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '61dc7421b1494b3a897e20387e5bb033'
                        key: {
                            sys_ui_form: {
                                id: '218fb87fc32f42d8ab10bdf7e186e049'
                                key: {
                                    name: 'x_711398_se_submission'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '71923a1e850b44f79a9f4e873f0adb6e'
                                key: {
                                    name: 'x_711398_se_submission'
                                    caption: 'Submission'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: '627a09ee44ac443bbe004602d8afc63d'
                        key: {
                            ui_policy: {
                                id: 'dd8922fa5cc5450e9936814a26aac5e9'
                                key: {
                                    table: 'x_711398_se_submission'
                                    short_description: 'Members may edit only Description and Work notes'
                                }
                            }
                            field: 'assigned_to'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '62db6095060a4aca9894cfb3a8804cc9'
                        key: {
                            name: 'x_711398_se_submission'
                            element: 'level'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '63563031af57436b826f5d8906ecd71e'
                        key: {
                            list_id: {
                                id: '5bdf81138bbc4ac9b0a819c5ed79fcc8'
                                key: {
                                    name: 'x_711398_se_skill'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'weight'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '654e758c661649aca0bc525b9e524011'
                        deleted: true
                        key: {
                            sys_security_acl: '80afae9c59da45c990b5a14d6e9408f9'
                            sys_user_role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '65745cb55011412ab4b58c10dec3a96d'
                        key: {
                            name: 'x_711398_se_level'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '65831db2191d4f84b9479decfedba987'
                        key: {
                            sys_ui_section: {
                                id: '71923a1e850b44f79a9f4e873f0adb6e'
                                key: {
                                    name: 'x_711398_se_submission'
                                    caption: 'Submission'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'score'
                            position: '7'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '670be154c4c245929db9e494c21acb1a'
                        key: {
                            sys_ui_section: {
                                id: '853255a1828746df8d10d070cfb26cc6'
                                key: {
                                    name: 'x_711398_se_product_line'
                                    caption: 'Product Line'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'description'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '69d13124c7974ac59866ef3b1f1f58f2'
                        key: {
                            name: 'x_711398_se_skill'
                            caption: 'Skill'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '69e999a8ce6646fa817d79f65b70ee8b'
                        key: {
                            sys_ui_form: {
                                id: '218fb87fc32f42d8ab10bdf7e186e049'
                                key: {
                                    name: 'x_711398_se_submission'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '577489b1693640a38a2e7d538204309d'
                                key: {
                                    name: 'x_711398_se_submission'
                                    caption: 'Notes'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6a1ef582a33f4502be9d66a1beb6c460'
                        key: {
                            name: 'x_711398_se_level'
                            element: 'min_score'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '6d52970b3b3e419bb2d204bea7e4ca0b'
                        key: {
                            sys_ui_section: {
                                id: '8c8c0b06ea894d8f866b3543694b5ce1'
                                key: {
                                    name: 'x_711398_se_level'
                                    caption: 'Level'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '6e654dce1aeb496b8d3430e87d8669e5'
                        key: {
                            name: 'x_711398_se_submission'
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6e7c3a2ae27e40bda0e2798497ca94ca'
                        key: {
                            name: 'x_711398_se_product_line'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '6fba109c96964e7dbbc46c67cd48bc27'
                        key: {
                            sys_security_acl: '196d625188dd4aa0a13302fba9044219'
                            sys_user_role: {
                                id: '510864fdf2b84952a7595fe5e602132e'
                                key: {
                                    name: 'x_711398_se.se_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '6feb5c5a39f1494caf763ff6a0e3b15b'
                        key: {
                            sys_security_acl: 'a5fc75ddf82e4866bfd020b61c56c8a6'
                            sys_user_role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '71923a1e850b44f79a9f4e873f0adb6e'
                        key: {
                            name: 'x_711398_se_submission'
                            caption: 'Submission'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '74499924593f43e5b225a1a5b2d471aa'
                        key: {
                            name: 'x_711398_se_skill'
                            element: 'product_line'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '75ec4ecabf1441869510414027aac301'
                        key: {
                            name: 'x_711398_se_product_line'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_action_role'
                        id: '7658202afda74eb982a6686dd57d5934'
                        key: {
                            sys_ui_action: '04d6a7685c244e90a07719dda70bef82'
                            sys_user_role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '77e5b22d6db5492ab2e9d43345fe9880'
                        key: {
                            name: 'x_711398_se_skill_assessment'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '79d220ff498145b2a4033c949e4f2b35'
                        key: {
                            sys_ui_section: {
                                id: '8c8c0b06ea894d8f866b3543694b5ce1'
                                key: {
                                    name: 'x_711398_se_level'
                                    caption: 'Level'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'min_score'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '7a0670378a844cab8a6ad9ed050dfe35'
                        key: {
                            sys_ui_form: {
                                id: 'd1940f89d197484ea9e68eb5d5e0d433'
                                key: {
                                    name: 'x_711398_se_level'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '8c8c0b06ea894d8f866b3543694b5ce1'
                                key: {
                                    name: 'x_711398_se_level'
                                    caption: 'Level'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7af6a76930594e408cb3038026854ec3'
                        key: {
                            name: 'x_711398_se_submission'
                            element: 'level'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '7b02d421e5eb4833949b88df348fbc00'
                        key: {
                            name: 'x_711398_se_cert_acquisition'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '7d9c5b68eb474488a45491cfe27db885'
                        key: {
                            name: 'x_711398_se_skill'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '7e49cd5b0e93422e90fa36e259678869'
                        key: {
                            sys_security_acl: '675c2c6f247045f69f3688fd28dc9f77'
                            sys_user_role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '7e66c4b29c4d4e6e83911a745a17d90f'
                        key: {
                            sys_security_acl: '5824f86147f04a8b8fee001b38a42d59'
                            sys_user_role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '7e95e3b9933c40809c828a419c866765'
                        key: {
                            name: 'x_711398_se_skill_assessment'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7eea48bb06f3483e95d394780bcb5393'
                        key: {
                            name: 'x_711398_se_skill'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '7f5ae69bdb1b4edcb30ae8b3a75ad503'
                        key: {
                            sys_ui_section: {
                                id: '69d13124c7974ac59866ef3b1f1f58f2'
                                key: {
                                    name: 'x_711398_se_skill'
                                    caption: 'Skill'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '80e7a13fd19f4e70906bee211d422ef5'
                        key: {
                            name: 'x_711398_se_product_line'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8123f2d18fa441f28f5e684dcad311e6'
                        key: {
                            name: 'x_711398_se_skill'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '824c30dfe4644feb8bab1513c81ea5ff'
                        key: {
                            name: 'x_711398_se_submission'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: '8278bff5d98b418ba07d86fc3a3d0dc4'
                        key: {
                            name: 'x_711398_se_skill'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '828dd59fa52a438fa6f0fea7cffca6f5'
                        key: {
                            list_id: {
                                id: 'd208da4e36fe4c119ee9636638bae741'
                                key: {
                                    name: 'x_711398_se_product_line'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '84653a0958be456eb3b03fefcfcde12b'
                        key: {
                            sys_security_acl: '09d817ba50d74996836da1685f811b13'
                            sys_user_role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '853255a1828746df8d10d070cfb26cc6'
                        key: {
                            name: 'x_711398_se_product_line'
                            caption: 'Product Line'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '87c09ee92d6e4459bdb217da047099aa'
                        key: {
                            sys_ui_section: {
                                id: 'ed61343cae6040249ea48794ce12835a'
                                key: {
                                    name: 'x_711398_se_skill_assessment'
                                    caption: 'Skill Assessment'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'proficiency_level'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '87ef280f2e4e410990eb8c6f1c6e59fd'
                        key: {
                            sys_ui_section: {
                                id: 'ef93ff79d7c74c02807b63e2d25fa3a1'
                                key: {
                                    name: 'x_711398_se_certificate'
                                    caption: 'Certificate'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '882d52ba9f574f5498f4c0b74eff89cc'
                        key: {
                            name: 'x_711398_se_cert_acquisition'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '885956c8a75d4dfeb001ddb4620a6983'
                        key: {
                            sys_ui_section: {
                                id: '69d13124c7974ac59866ef3b1f1f58f2'
                                key: {
                                    name: 'x_711398_se_skill'
                                    caption: 'Skill'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'weight'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '89f3ab8526d74d6eb9d848d2b20ad41a'
                        key: {
                            name: 'x_711398_se_certificate'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '8c8c0b06ea894d8f866b3543694b5ce1'
                        key: {
                            name: 'x_711398_se_level'
                            caption: 'Level'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8db33926b25b49358cd9d07b7de469f4'
                        key: {
                            name: 'x_711398_se_cert_acquisition'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '9342b52ba8894027a7d0a4f4a30de01d'
                        key: {
                            sys_ui_section: {
                                id: '577489b1693640a38a2e7d538204309d'
                                key: {
                                    name: 'x_711398_se_submission'
                                    caption: 'Notes'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'work_notes'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '93fb20d8e1e2454d9947ee1334aa6909'
                        key: {
                            sys_ui_section: {
                                id: '69d13124c7974ac59866ef3b1f1f58f2'
                                key: {
                                    name: 'x_711398_se_skill'
                                    caption: 'Skill'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '97442598d6064cbfbf8a80143d6b2f38'
                        key: {
                            name: 'x_711398_se_level'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: '991a52aaf21c437794fd9365de5b5385'
                        key: {
                            ui_policy: {
                                id: 'ff92fbc56945404ca7d17e3edc38dbbf'
                                key: {
                                    table: 'x_711398_se_skill_assessment'
                                    short_description: 'Skill description and Product Line are read-only'
                                }
                            }
                            field: 'skill'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '9a109537ac6f4711932166423adb9f0d'
                        key: {
                            sys_security_acl: '7e8f4a533bde4a37928f601263a9e186'
                            sys_user_role: {
                                id: '510864fdf2b84952a7595fe5e602132e'
                                key: {
                                    name: 'x_711398_se.se_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '9b0b882d67854ee4a59526fc5d0b1e0b'
                        key: {
                            sys_ui_section: {
                                id: '71923a1e850b44f79a9f4e873f0adb6e'
                                key: {
                                    name: 'x_711398_se_submission'
                                    caption: 'Submission'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '9b5a29f640a644839ffb239250668750'
                        key: {
                            sys_ui_section: {
                                id: 'ed61343cae6040249ea48794ce12835a'
                                key: {
                                    name: 'x_711398_se_skill_assessment'
                                    caption: 'Skill Assessment'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'skill.product_line'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9b601d446f92436da190ae44f74676b3'
                        key: {
                            name: 'x_711398_se_skill_assessment'
                            element: 'proficiency_level'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '9c185507d21e49648fa0d5896c4e6c6b'
                        key: {
                            sys_security_acl: '2a4cfe4d140b465cbc619744b60456f1'
                            sys_user_role: {
                                id: '510864fdf2b84952a7595fe5e602132e'
                                key: {
                                    name: 'x_711398_se.se_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'a0569611d536431094f11b170b03f205'
                        key: {
                            list_id: {
                                id: '5bdf81138bbc4ac9b0a819c5ed79fcc8'
                                key: {
                                    name: 'x_711398_se_skill'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'product_line'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: 'a0dbaf6558a74de799e648f98b260a20'
                        key: {
                            ui_policy: {
                                id: 'dd8922fa5cc5450e9936814a26aac5e9'
                                key: {
                                    table: 'x_711398_se_submission'
                                    short_description: 'Members may edit only Description and Work notes'
                                }
                            }
                            field: 'state'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'a0dd1373adf7473caa22eadd2d980fce'
                        key: {
                            sys_ui_section: {
                                id: '71923a1e850b44f79a9f4e873f0adb6e'
                                key: {
                                    name: 'x_711398_se_submission'
                                    caption: 'Submission'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'state'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a0de42180bc54222a43de482138c7a9a'
                        key: {
                            name: 'x_711398_se_skill_assessment'
                            element: 'skill'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: 'a1105543072c4cea8d3a0730494550ef'
                        key: {
                            ui_policy: {
                                id: '506950b676054ff18489656b17ba2e5b'
                                key: {
                                    table: 'x_711398_se_submission'
                                    short_description: 'Hide Level while the Submission is Draft'
                                }
                            }
                            field: 'level'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'a4adcbd87826456c904286a52a194b26'
                        key: {
                            sys_ui_form: {
                                id: 'dd05a01bfd77464c8a22bb989b1bc7a5'
                                key: {
                                    name: 'x_711398_se_skill_assessment'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: 'ed61343cae6040249ea48794ce12835a'
                                key: {
                                    name: 'x_711398_se_skill_assessment'
                                    caption: 'Skill Assessment'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'a5bd414e38b84b6a837889a7f97230b5'
                        key: {
                            sys_security_acl: '0051e77763fc4139b5ae604177150bcf'
                            sys_user_role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a616aa93df264b1a8a6fddc37b7afa64'
                        key: {
                            name: 'x_711398_se_level'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'a83a0d4471254043bc582737f3bbac7c'
                        key: {
                            sys_security_acl: 'a5f2a45a2a07422589cc760bd8fae241'
                            sys_user_role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'a9e022ff994c4fd1be7dc3fb1c06f3fc'
                        key: {
                            sys_security_acl: '8729350989954f60b8d73a038f533bbd'
                            sys_user_role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ab5879e2f89d44ac8eab96cddeb43104'
                        key: {
                            name: 'x_711398_se_submission'
                            element: 'state'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'ac25e3c9b83a47319381de685159adc1'
                        key: {
                            name: 'x_711398_se_submission'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'acc1c3ea52c24205a0034ee0879175e5'
                        key: {
                            sys_ui_section: {
                                id: '57e31fa2bb9345109934ce0f371c298d'
                                key: {
                                    name: 'x_711398_se_cert_acquisition'
                                    caption: 'Cert Acquisition'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'add371b3c05349d3a6d5247add8af6cb'
                        key: {
                            sys_security_acl: 'c39add822b004d2aadf4737ff5065727'
                            sys_user_role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'af645180a44d4acdb057ade3ab7ab0bf'
                        key: {
                            sys_security_acl: 'cdfa89efd41a4fbe946eb3c6f60c4ead'
                            sys_user_role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'afc5e82fb07548708840579dd4f3796a'
                        key: {
                            sys_ui_section: {
                                id: '71923a1e850b44f79a9f4e873f0adb6e'
                                key: {
                                    name: 'x_711398_se_submission'
                                    caption: 'Submission'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'opened_by'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: 'b0940f2833fd4cb59598ed84e6e69072'
                        key: {
                            ui_policy: {
                                id: 'dd8922fa5cc5450e9936814a26aac5e9'
                                key: {
                                    table: 'x_711398_se_submission'
                                    short_description: 'Members may edit only Description and Work notes'
                                }
                            }
                            field: 'valid'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'b116b998d1ef4ddaa55fbb6ae4eaa588'
                        key: {
                            sys_ui_section: {
                                id: '71923a1e850b44f79a9f4e873f0adb6e'
                                key: {
                                    name: 'x_711398_se_submission'
                                    caption: 'Submission'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'valid'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b150ce345910486f9ed0e7c14976280e'
                        key: {
                            name: 'x_711398_se_submission'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b1b8a09bc38541a8bb971f224eba7bab'
                        key: {
                            name: 'x_711398_se_submission'
                            element: 'state'
                            value: 'draft'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'b214287460a746fc88c7d61bc8216d9f'
                        key: {
                            sys_ui_section: {
                                id: '57e31fa2bb9345109934ce0f371c298d'
                                key: {
                                    name: 'x_711398_se_cert_acquisition'
                                    caption: 'Cert Acquisition'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'b276e86b7bcf4464a312eee86b0b46d3'
                        key: {
                            sys_security_acl: 'fee7f2b5856741e2a05818e5dff5a8e2'
                            sys_user_role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b27869529a714124b53d0b29145769c2'
                        key: {
                            name: 'x_711398_se_submission'
                            element: 'score'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'b38ede82939a47e7acfc35b270c4b26c'
                        key: {
                            sys_security_acl: '6bc106299796446d9edfdbb2dd02ad2e'
                            sys_user_role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'b64484c225f4437395d61c2fad2902de'
                        key: {
                            sys_ui_section: {
                                id: '57e31fa2bb9345109934ce0f371c298d'
                                key: {
                                    name: 'x_711398_se_cert_acquisition'
                                    caption: 'Cert Acquisition'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'certificate'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'b67e8b2256c94df6b3ac14897627d2e3'
                        key: {
                            sys_ui_section: {
                                id: 'ed61343cae6040249ea48794ce12835a'
                                key: {
                                    name: 'x_711398_se_skill_assessment'
                                    caption: 'Skill Assessment'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'baa9cb6c84094f6296748f6620a765cd'
                        key: {
                            name: 'x_711398_se_skill'
                            element: 'weight'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'bc289390b3a44fbfade834c91539a5c4'
                        key: {
                            sys_security_acl: 'bcae67a6a1464b87bac57bc16b245cd2'
                            sys_user_role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'bd83d5fd69fd4e01a743fc20ab90ecd9'
                        key: {
                            sys_security_acl: '107f5d7f31cb4b7ab8616b3a566e387d'
                            sys_user_role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'bd8bb833358548d99416c153a20af2a8'
                        key: {
                            name: 'x_711398_se_skill_assessment'
                            element: 'proficiency_level'
                            value: '1'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_list'
                        id: 'be468e59f0264461b49e2170801c339b'
                        key: {
                            name: 'x_711398_se_level'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                            element: 'NULL'
                            relationship: 'NULL'
                            parent: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'be503cee42f64deebc748803b2363dd9'
                        key: {
                            sys_ui_section: {
                                id: 'ef93ff79d7c74c02807b63e2d25fa3a1'
                                key: {
                                    name: 'x_711398_se_certificate'
                                    caption: 'Certificate'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'product_line'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'be6af8d9129843b69da37d6fceb13cbb'
                        key: {
                            sys_security_acl: '020c8cc7db774a49b29dcaef044421e1'
                            sys_user_role: {
                                id: '510864fdf2b84952a7595fe5e602132e'
                                key: {
                                    name: 'x_711398_se.se_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'bfb208a13d1942ffa532e4cebdf0ea6a'
                        key: {
                            sys_ui_section: {
                                id: 'ed61343cae6040249ea48794ce12835a'
                                key: {
                                    name: 'x_711398_se_skill_assessment'
                                    caption: 'Skill Assessment'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'skill'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c0b125071dac4ce3b55f2a52d0562564'
                        key: {
                            name: 'x_711398_se_submission'
                            element: 'opened_by'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'c0fe4af3ad2e46d586b13c488fd178fe'
                        key: {
                            sys_security_acl: '71120fcafed14224a983a2a1f117597e'
                            sys_user_role: {
                                id: '510864fdf2b84952a7595fe5e602132e'
                                key: {
                                    name: 'x_711398_se.se_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'c207beec58bb4d38b44cd574cf82dbe1'
                        key: {
                            list_id: {
                                id: 'be468e59f0264461b49e2170801c339b'
                                key: {
                                    name: 'x_711398_se_level'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'min_score'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c3c0ab38629e4e88bf2c2dcbd4031c07'
                        key: {
                            name: 'x_711398_se_submission'
                            element: 'assigned_to'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c3edc0d6ae6f40118ddc6d57e05ee089'
                        key: {
                            name: 'x_711398_se_skill_assessment'
                            element: 'proficiency_level'
                            value: '3'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'c4ecff6fd69e426b96634f0fa757e059'
                        key: {
                            sys_ui_section: {
                                id: 'ed61343cae6040249ea48794ce12835a'
                                key: {
                                    name: 'x_711398_se_skill_assessment'
                                    caption: 'Skill Assessment'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: 'c6075b166f0340aaabc59fac0d930d20'
                        key: {
                            ui_policy: {
                                id: 'dd8922fa5cc5450e9936814a26aac5e9'
                                key: {
                                    table: 'x_711398_se_submission'
                                    short_description: 'Members may edit only Description and Work notes'
                                }
                            }
                            field: 'number'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: 'c7bbf4327a7440579da0f4373b247dd2'
                        key: {
                            ui_policy: {
                                id: 'ff92fbc56945404ca7d17e3edc38dbbf'
                                key: {
                                    table: 'x_711398_se_skill_assessment'
                                    short_description: 'Skill description and Product Line are read-only'
                                }
                            }
                            field: 'submission'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: 'c804f543cfb84cc988b6306469d44e6d'
                        key: {
                            logical_table_name: 'x_711398_se_cert_acquisition'
                            col_name_string: 'submission,certificate'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'c861cf4cebbc4becb26599a01051b873'
                        key: {
                            sys_ui_section: {
                                id: 'ed61343cae6040249ea48794ce12835a'
                                key: {
                                    name: 'x_711398_se_skill_assessment'
                                    caption: 'Skill Assessment'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c93bb5f466744cfc981f9e4e20fa0844'
                        key: {
                            name: 'x_711398_se_product_line'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ca7e19d00b6c485f996196bc4cbc485a'
                        key: {
                            sys_security_acl: '733b04b1b3a3427c897287796d623233'
                            sys_user_role: {
                                id: '510864fdf2b84952a7595fe5e602132e'
                                key: {
                                    name: 'x_711398_se.se_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'caa7492d37a84085922fbdca9694ba59'
                        key: {
                            name: 'x_711398_se_cert_acquisition'
                            element: 'certificate'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list'
                        id: 'cb3d4a0d6c1247b5b62a97a5b8430f4d'
                        key: {
                            name: 'x_711398_se_submission'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                            element: 'NULL'
                            relationship: 'NULL'
                            parent: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_policy'
                        id: 'cba23b3140394579bf126049875730ef'
                        key: {
                            table: 'x_711398_se_submission'
                            short_description: 'Lock Description after leaving Draft'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cda776e1af1a422485c748872ce966f3'
                        key: {
                            name: 'x_711398_se_submission'
                            element: 'opened_by'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cdb85bfe16844822b627660326029f06'
                        key: {
                            name: 'x_711398_se_level'
                            element: 'min_score'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'cdc0fb7a6f794d42b4fca449bec2e0cc'
                        key: {
                            sys_ui_section: {
                                id: '57e31fa2bb9345109934ce0f371c298d'
                                key: {
                                    name: 'x_711398_se_cert_acquisition'
                                    caption: 'Cert Acquisition'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cf12e748d3304d3dbd05b52824b8b7a4'
                        key: {
                            name: 'x_711398_se_skill_assessment'
                            element: 'skill'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'cfe375eb915240f79af82a37574e614e'
                        key: {
                            sys_ui_section: {
                                id: '577489b1693640a38a2e7d538204309d'
                                key: {
                                    name: 'x_711398_se_submission'
                                    caption: 'Notes'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'activity.xml'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'd071189a40f6496ba5a7a49bd88b63c8'
                        key: {
                            list_id: {
                                id: 'cb3d4a0d6c1247b5b62a97a5b8430f4d'
                                key: {
                                    name: 'x_711398_se_submission'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'd0df25a58c524ed69caae2d2580aee5d'
                        key: {
                            name: 'x_711398_se.se_admin'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'd16cfb4a156a42e7b1e742ff36712ad1'
                        key: {
                            name: 'x_711398_se_product_line'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: 'd1940f89d197484ea9e68eb5d5e0d433'
                        key: {
                            name: 'x_711398_se_level'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_list'
                        id: 'd208da4e36fe4c119ee9636638bae741'
                        key: {
                            name: 'x_711398_se_product_line'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                            element: 'NULL'
                            relationship: 'NULL'
                            parent: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'd210f4570fb348189077a50d14d46446'
                        key: {
                            sys_security_acl: 'e1ac52bea5304a23ac3074c7f7e4c438'
                            sys_user_role: {
                                id: '510864fdf2b84952a7595fe5e602132e'
                                key: {
                                    name: 'x_711398_se.se_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'd53a0a7495274c35b63389f75b03c4cf'
                        key: {
                            list_id: {
                                id: 'cb3d4a0d6c1247b5b62a97a5b8430f4d'
                                key: {
                                    name: 'x_711398_se_submission'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd9a106cdf4af4ba9b643614a6dda99f9'
                        key: {
                            name: 'x_711398_se_submission'
                            element: 'score'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'd9b0ed9c5975405b9065f50d0bdb1f33'
                        key: {
                            list_id: {
                                id: '3bb01c449a8f4ea2b443f8189dd4fdae'
                                key: {
                                    name: 'x_711398_se_certificate'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'dad48bd9adbe48779d9410dd7d04183e'
                        key: {
                            sys_security_acl: '53a1db4ee771477dacb2466697dcf4e2'
                            sys_user_role: {
                                id: '510864fdf2b84952a7595fe5e602132e'
                                key: {
                                    name: 'x_711398_se.se_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'dcdd622f07c843969d164fe5f1e8ab52'
                        key: {
                            sys_ui_section: {
                                id: '8c8c0b06ea894d8f866b3543694b5ce1'
                                key: {
                                    name: 'x_711398_se_level'
                                    caption: 'Level'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: 'dd05a01bfd77464c8a22bb989b1bc7a5'
                        key: {
                            name: 'x_711398_se_skill_assessment'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_policy'
                        id: 'dd8922fa5cc5450e9936814a26aac5e9'
                        key: {
                            table: 'x_711398_se_submission'
                            short_description: 'Members may edit only Description and Work notes'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'dd921e77c6f449bfb17313e8deed18b7'
                        key: {
                            name: 'x_711398_se_skill'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'dea58c4a358843298e307d2b49ec1b62'
                        key: {
                            sys_ui_form: {
                                id: '0a8fee7400d64f7aa77954fe0dbc14f2'
                                key: {
                                    name: 'x_711398_se_certificate'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: 'ef93ff79d7c74c02807b63e2d25fa3a1'
                                key: {
                                    name: 'x_711398_se_certificate'
                                    caption: 'Certificate'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'dfc3f7e05a5f47629517b3dac47f579b'
                        key: {
                            list_id: {
                                id: 'be468e59f0264461b49e2170801c339b'
                                key: {
                                    name: 'x_711398_se_level'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'dfce18cb202b40da8674e70e059d2fc8'
                        key: {
                            name: 'x_711398_se_submission'
                            element: 'state'
                            value: 'submitted'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: 'dffa9d0ea7ad449e82ee6c6367cb692b'
                        key: {
                            ui_policy: {
                                id: 'dd8922fa5cc5450e9936814a26aac5e9'
                                key: {
                                    table: 'x_711398_se_submission'
                                    short_description: 'Members may edit only Description and Work notes'
                                }
                            }
                            field: 'level'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: 'e04fcba66a86475c951fda9276a7f33e'
                        key: {
                            ui_policy: {
                                id: 'dd8922fa5cc5450e9936814a26aac5e9'
                                key: {
                                    table: 'x_711398_se_submission'
                                    short_description: 'Members may edit only Description and Work notes'
                                }
                            }
                            field: 'opened_by'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: 'e072ef2e00a74c4495c18dcae5847f3d'
                        key: {
                            role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                            contains: {
                                id: '510864fdf2b84952a7595fe5e602132e'
                                key: {
                                    name: 'x_711398_se.se_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'e102bdfffb9c46bf8c62d9c2dd554f75'
                        key: {
                            list_id: {
                                id: '28bb75635f54414290c1e10f72171546'
                                key: {
                                    name: 'x_711398_se_cert_acquisition'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'certificate.product_line'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'e234aadc76a84a66a5659886f2d79ed6'
                        key: {
                            sys_security_acl: 'b3fbef6b862e494fad7800a971d71f42'
                            sys_user_role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'e501bfd0c7494148bedccf3e4f68c214'
                        key: {
                            sys_ui_section: {
                                id: 'ef93ff79d7c74c02807b63e2d25fa3a1'
                                key: {
                                    name: 'x_711398_se_certificate'
                                    caption: 'Certificate'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'name'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: 'e5bf0215cbce48f39044c15606805308'
                        key: {
                            ui_policy: {
                                id: 'cba23b3140394579bf126049875730ef'
                                key: {
                                    table: 'x_711398_se_submission'
                                    short_description: 'Lock Description after leaving Draft'
                                }
                            }
                            field: 'work_notes'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e5c9f31a8a454a73ad5a2b463682d459'
                        key: {
                            name: 'x_711398_se_level'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'eb8a59ee7fc5467f92d060a014a2a2cb'
                        key: {
                            list_id: {
                                id: 'cb3d4a0d6c1247b5b62a97a5b8430f4d'
                                key: {
                                    name: 'x_711398_se_submission'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'valid'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'ec53125298bb400591de4120b2ead6d3'
                        key: {
                            sys_ui_section: {
                                id: 'ef93ff79d7c74c02807b63e2d25fa3a1'
                                key: {
                                    name: 'x_711398_se_certificate'
                                    caption: 'Certificate'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'ed0c6556e36f4392a52f4120c63ff033'
                        key: {
                            sys_ui_section: {
                                id: '71923a1e850b44f79a9f4e873f0adb6e'
                                key: {
                                    name: 'x_711398_se_submission'
                                    caption: 'Submission'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'ed61343cae6040249ea48794ce12835a'
                        key: {
                            name: 'x_711398_se_skill_assessment'
                            caption: 'Skill Assessment'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ee02ab1663c542cabcd34891a8ba7336'
                        key: {
                            name: 'x_711398_se_submission'
                            element: 'work_notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_action_role'
                        id: 'ee1518dc510b42919bb99f5d3a8362da'
                        key: {
                            sys_ui_action: 'eca8ad8c42274843afc9ca351218af56'
                            sys_user_role: {
                                id: '510864fdf2b84952a7595fe5e602132e'
                                key: {
                                    name: 'x_711398_se.se_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ee8c2a959cfc4900a0c847101ae531b4'
                        key: {
                            sys_security_acl: '4258714bf1f04811a6185c034f19a53c'
                            sys_user_role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'ef93ff79d7c74c02807b63e2d25fa3a1'
                        key: {
                            name: 'x_711398_se_certificate'
                            caption: 'Certificate'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'f19ac8090e88471a973d17adc5e95fc7'
                        key: {
                            sys_ui_form: {
                                id: '10d22a8d39b34b2aa6f6ac12f8da8cea'
                                key: {
                                    name: 'x_711398_se_cert_acquisition'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '57e31fa2bb9345109934ce0f371c298d'
                                key: {
                                    name: 'x_711398_se_cert_acquisition'
                                    caption: 'Cert Acquisition'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'f2e57768115d4ec89ec2dc5be4b8aee5'
                        key: {
                            sys_security_acl: '0936a921c5fd47d4a5bfbd16cfc43810'
                            sys_user_role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'f37d36467c154df29facc0db81ab685f'
                        key: {
                            name: 'x_711398_se_certificate'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'f63d51ad75f1411a83f7a5e6cb9163d8'
                        key: {
                            sys_security_acl: 'fd063724a7d8455e86d9dc6b174ccee1'
                            sys_user_role: {
                                id: '510864fdf2b84952a7595fe5e602132e'
                                key: {
                                    name: 'x_711398_se.se_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f68daf39187a4333bd07ef8fd66183dd'
                        key: {
                            name: 'x_711398_se_certificate'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'f6a57d01955445ed9e6be692444cec83'
                        key: {
                            sys_ui_section: {
                                id: 'ef93ff79d7c74c02807b63e2d25fa3a1'
                                key: {
                                    name: 'x_711398_se_certificate'
                                    caption: 'Certificate'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'f82311f6f9ec4bc4923d1bb2f1b9ef47'
                        key: {
                            sys_security_acl: '4a2573458a924ce2a14dfe0ab62439a2'
                            sys_user_role: {
                                id: '510864fdf2b84952a7595fe5e602132e'
                                key: {
                                    name: 'x_711398_se.se_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'f89ac582399a48aebbf8036a506e1b13'
                        key: {
                            sys_ui_section: {
                                id: '69d13124c7974ac59866ef3b1f1f58f2'
                                key: {
                                    name: 'x_711398_se_skill'
                                    caption: 'Skill'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'description'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'fce4f2c6b6184a1d9aa12a48560db537'
                        key: {
                            sys_security_acl: 'a6646c1224b54c80878abade5b9cb677'
                            sys_user_role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'feb4b017469d41e1b17e32c52692925c'
                        key: {
                            sys_security_acl: '653130d7a82f46d8857733e0feae1964'
                            sys_user_role: {
                                id: '510864fdf2b84952a7595fe5e602132e'
                                key: {
                                    name: 'x_711398_se.se_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'ff4e0f9b88ae4193a707069c30883a36'
                        key: {
                            sys_ui_section: {
                                id: '8c8c0b06ea894d8f866b3543694b5ce1'
                                key: {
                                    name: 'x_711398_se_level'
                                    caption: 'Level'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'name'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_policy'
                        id: 'ff92fbc56945404ca7d17e3edc38dbbf'
                        key: {
                            table: 'x_711398_se_skill_assessment'
                            short_description: 'Skill description and Product Line are read-only'
                        }
                    },
                ]
            }
        }
    }
}
