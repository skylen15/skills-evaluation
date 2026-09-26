import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    'atf-email-assert-coe-rejected-count': {
                        table: 'sys_atf_step'
                        id: '8b5782a176064e7391b0f217fc3548a4'
                    }
                    'atf-email-assert-created-count': {
                        table: 'sys_atf_step'
                        id: '57ce27e1c17b44d388be33fae8b1ed95'
                    }
                    'atf-email-assert-pm-approved-count': {
                        table: 'sys_atf_step'
                        id: 'f5f464a5b54541299f7b0132fec90fd9'
                    }
                    'atf-email-assert-pm-rejected-count': {
                        table: 'sys_atf_step'
                        id: 'c2fb91d8c3244a3bba5b9862f2f96474'
                    }
                    'atf-email-assert-submitted-count': {
                        table: 'sys_atf_step'
                        id: 'd628487f1960474fa7a7c12d6a8cb0d8'
                    }
                    'atf-email-coe-reject-3': {
                        table: 'sys_atf_step'
                        id: 'a3edc54fa9984ef4866b10642b77e2ca'
                    }
                    'atf-email-create-coe': {
                        table: 'sys_atf_step'
                        id: '991ec0ae3429451680c81eac0d702a37'
                    }
                    'atf-email-create-member': {
                        table: 'sys_atf_step'
                        id: 'bf1e21d6e4cf46d2a784d5102fefdaa3'
                        deleted: true
                    }
                    'atf-email-create-member-1': {
                        table: 'sys_atf_step'
                        id: '85950516a5c54930a116b9638ddd8ebc'
                    }
                    'atf-email-create-member-2': {
                        table: 'sys_atf_step'
                        id: 'f8e3a00413d54bfc9eff8774283111e7'
                    }
                    'atf-email-create-member-3': {
                        table: 'sys_atf_step'
                        id: 'dd11f82270e141dc82df0d437f73f962'
                    }
                    'atf-email-create-pm': {
                        table: 'sys_atf_step'
                        id: 'a0152d37cbf34736b3987a85e9b8598f'
                    }
                    'atf-email-impersonate-coe-3': {
                        table: 'sys_atf_step'
                        id: '5e4babd890c84729b3008c1348d9e816'
                    }
                    'atf-email-impersonate-member-1': {
                        table: 'sys_atf_step'
                        id: 'dbc9587c7e3042ac80593815c32bf452'
                    }
                    'atf-email-impersonate-member-2': {
                        table: 'sys_atf_step'
                        id: '64de3ca6b60347809651c402ac992d3d'
                    }
                    'atf-email-impersonate-member-3': {
                        table: 'sys_atf_step'
                        id: '3b860fa66d974e7ca7fdc5dbf00521a9'
                    }
                    'atf-email-impersonate-member-for-submit-1': {
                        table: 'sys_atf_step'
                        id: '27c26f8cdc93457184f7a72cd62550d8'
                    }
                    'atf-email-impersonate-pm-1': {
                        table: 'sys_atf_step'
                        id: 'abb4ed390b3d470e9b67a29a95fa049f'
                    }
                    'atf-email-impersonate-pm-2': {
                        table: 'sys_atf_step'
                        id: 'c80982f4c13743eaba03c8d19e94ffa5'
                    }
                    'atf-email-impersonate-pm-3': {
                        table: 'sys_atf_step'
                        id: '22470d70b95d4b57aa2030adc7735862'
                    }
                    'atf-email-insert-sub-1': {
                        table: 'sys_atf_step'
                        id: '6e1b44b3218b4278a06e0ba0951e87ec'
                    }
                    'atf-email-insert-sub-2': {
                        table: 'sys_atf_step'
                        id: 'f58cb2b8878a4634a793ef63c0fce5b6'
                    }
                    'atf-email-insert-sub-3': {
                        table: 'sys_atf_step'
                        id: '28b1f204578140aa8286fb4929bd4cda'
                    }
                    'atf-email-member-submit-1': {
                        table: 'sys_atf_step'
                        id: '398665856caa48a5bb14dfe7dd6114b8'
                    }
                    'atf-email-member-submit-2': {
                        table: 'sys_atf_step'
                        id: '3d8cf9b8d11445f991e3e34ec6412e6a'
                    }
                    'atf-email-member-submit-3': {
                        table: 'sys_atf_step'
                        id: 'c65cd9f3659e4d0fbf689c24713b060c'
                    }
                    'atf-email-pm-approve-1': {
                        table: 'sys_atf_step'
                        id: '782e05882eb6457ca0a502b843bad30c'
                    }
                    'atf-email-pm-approve-3': {
                        table: 'sys_atf_step'
                        id: '5ef9071c5553420fa675cb6efbb817f1'
                    }
                    'atf-email-pm-reject-2': {
                        table: 'sys_atf_step'
                        id: 'cfd418da608b430cb783b7da1836ca4d'
                    }
                    'atf-email-validate-coe-rejected': {
                        table: 'sys_atf_step'
                        id: '2bcf8f10463149809a7581d26e1b6859'
                        deleted: false
                    }
                    'atf-email-validate-created': {
                        table: 'sys_atf_step'
                        id: '677ba1da2cad447b9555be912694a0cf'
                        deleted: false
                    }
                    'atf-email-validate-pm-approved': {
                        table: 'sys_atf_step'
                        id: '67b0fd4ff34847b683370acc6d780c6f'
                        deleted: false
                    }
                    'atf-email-validate-pm-rejected': {
                        table: 'sys_atf_step'
                        id: 'cd658824e728424eac213a133c660a85'
                        deleted: false
                    }
                    'atf-email-validate-submitted': {
                        table: 'sys_atf_step'
                        id: 'd433429271304936b77817b21bb7d316'
                        deleted: false
                    }
                    'atf-member-check-cert-acq-submitted-controls': {
                        table: 'sys_atf_step'
                        id: 'c8870d98b2df41f8a0a831b914402528'
                    }
                    'atf-member-check-skill-assessment-controls': {
                        table: 'sys_atf_step'
                        id: 'd12162408e914b6599051d3c5bd9197b'
                    }
                    'atf-member-click-submit-for-review': {
                        table: 'sys_atf_step'
                        id: '171fb967fc8b49cca3b4918187587750'
                    }
                    'atf-member-journey-user': {
                        table: 'sys_atf_step'
                        id: 'dfcded0f9c5d4aaf8cfee79536f435c8'
                    }
                    'atf-member-nav-visibility': {
                        table: 'sys_atf_step'
                        id: 'a677833bacd14280a2facdde9a3e56ba'
                    }
                    'atf-member-navigate-new-eval': {
                        table: 'sys_atf_step'
                        id: '35c0b6af68db462faa74c1c0e8be8659'
                    }
                    'atf-member-open-cert-acq-form': {
                        table: 'sys_atf_step'
                        id: 'b36e8431383f4c9daa22f46264cf6564'
                    }
                    'atf-member-open-new-form': {
                        table: 'sys_atf_step'
                        id: '2ce08f1880f748a4837cca6febc3b82f'
                        deleted: true
                    }
                    'atf-member-open-submitted-record': {
                        table: 'sys_atf_step'
                        id: 'a342d84aad2c4cbe95d54b1595268403'
                    }
                    'atf-member-reopen-draft-after-cert-check': {
                        table: 'sys_atf_step'
                        id: 'c24852e011814918872dd3807ceebfe1'
                    }
                    'atf-member-reopen-saved-draft': {
                        table: 'sys_atf_step'
                        id: '1dd8456248db44909763e1a86c8674a7'
                    }
                    'atf-member-save-work-notes': {
                        table: 'sys_atf_step'
                        id: '6a59045bbe5f489091846d05e1c05c74'
                    }
                    'atf-member-set-description': {
                        table: 'sys_atf_step'
                        id: 'ed727cedd73c4860a3b040aacfe7a76c'
                    }
                    'atf-member-set-submitted-work-notes': {
                        table: 'sys_atf_step'
                        id: '5e467dde917240a9859a9861332b2452'
                    }
                    'atf-member-submission-journey': {
                        table: 'sys_atf_test'
                        id: 'ac892b1d24664958b8adb90cfdaa2198'
                    }
                    'atf-member-submit-draft': {
                        table: 'sys_atf_step'
                        id: '9b91962b36ef4c768ae841325b0a469a'
                    }
                    'atf-member-validate-cert-evidence-fields': {
                        table: 'sys_atf_step'
                        id: 'e6438ba894ff4c0dbfc238889a3d3c11'
                    }
                    'atf-member-validate-draft-fields': {
                        table: 'sys_atf_step'
                        id: 'd9e453033d2242c98e497bcc25ed9772'
                    }
                    'atf-member-validate-level-visible': {
                        table: 'sys_atf_step'
                        id: '75827398f5854d5bb92c546cb38b1548'
                    }
                    'atf-member-validate-persisted-after-work-notes': {
                        table: 'sys_atf_step'
                        id: 'a994165cead24f6cbccebd95d55cf250'
                    }
                    'atf-member-validate-persisted-submitted': {
                        table: 'sys_atf_step'
                        id: '4a83d92b6d01494ba6461eff1c6cfea7'
                    }
                    'atf-member-validate-related-lists': {
                        table: 'sys_atf_step'
                        id: 'f88fa74df53141449796a295d0144d7c'
                    }
                    'atf-member-validate-submit-action': {
                        table: 'sys_atf_step'
                        id: '539b8915aca04251a2b2b7d2ed966256'
                    }
                    'atf-member-validate-submit-disappeared': {
                        table: 'sys_atf_step'
                        id: '7cc30954a2b843cfa84fa736208f0d03'
                    }
                    'atf-member-validate-submitted-fields-lock': {
                        table: 'sys_atf_step'
                        id: '90a63a077b9f43b489d5c1a5437dc7c0'
                    }
                    'atf-raj-admin-check-no-gates': {
                        table: 'sys_atf_step'
                        id: '49b221c11e0645b8b1902b8c07dc8b56'
                    }
                    'atf-raj-admin-module-visibility': {
                        table: 'sys_atf_step'
                        id: '0eb9d9b020514786af8960894abc5087'
                    }
                    'atf-raj-admin-open-submitted': {
                        table: 'sys_atf_step'
                        id: '655c837c0f0d4fae853da3c00561200b'
                    }
                    'atf-raj-coe-check-actions-on-submitted': {
                        table: 'sys_atf_step'
                        id: '8768140509b348ca8571948df8fc0e6a'
                        deleted: true
                    }
                    'atf-raj-coe-check-sub-2-actions': {
                        table: 'sys_atf_step'
                        id: 'ec5a6d890fce455d9df8d6f7f773b4d2'
                    }
                    'atf-raj-coe-check-sub-3-actions': {
                        table: 'sys_atf_step'
                        id: '42e0e16a8cec445bb5652db8ff3e5d2a'
                    }
                    'atf-raj-coe-check-submitted-actions': {
                        table: 'sys_atf_step'
                        id: '773883304e0f43f6bfd03222dfb422d4'
                    }
                    'atf-raj-coe-click-approve-sub-2': {
                        table: 'sys_atf_step'
                        id: 'dfd08723eccb4555b4b16d75a455ecf1'
                    }
                    'atf-raj-coe-click-reject-sub-3': {
                        table: 'sys_atf_step'
                        id: '73216deb3c174feb87f64bcfaaeef22a'
                    }
                    'atf-raj-coe-open-completed-sub-2': {
                        table: 'sys_atf_step'
                        id: 'a09f35f327f7469cacb3152648f53480'
                    }
                    'atf-raj-coe-open-sub-2': {
                        table: 'sys_atf_step'
                        id: '8cf561ab50f54508903badc6d5c3fcb1'
                    }
                    'atf-raj-coe-open-sub-3': {
                        table: 'sys_atf_step'
                        id: 'c145f1f940934d9185bb1a7c09a9a34b'
                    }
                    'atf-raj-coe-open-submitted': {
                        table: 'sys_atf_step'
                        id: 'bb69ffede2194bbfa88112a641d95f5a'
                    }
                    'atf-raj-coe-user': {
                        table: 'sys_atf_step'
                        id: '2c5d9925b63541b4a9b043330f789427'
                    }
                    'atf-raj-completed-absent-gate-actions': {
                        table: 'sys_atf_step'
                        id: '8644bb45cdd64a3c83921eba8324ed20'
                    }
                    'atf-raj-completed-field-lock': {
                        table: 'sys_atf_step'
                        id: 'a2aad9fc482741f59bd0e83beb4ccf8e'
                    }
                    'atf-raj-create-sub-1': {
                        table: 'sys_atf_step'
                        id: '4e43ae129706448bbe18817cbfc56280'
                    }
                    'atf-raj-create-sub-2': {
                        table: 'sys_atf_step'
                        id: 'a450d30d60a44f5a9ec7a33e6a7d4921'
                    }
                    'atf-raj-create-sub-3': {
                        table: 'sys_atf_step'
                        id: '2d8887a2b25b4dd4ad35bb02a8eec62a'
                    }
                    'atf-raj-create-submission': {
                        table: 'sys_atf_step'
                        id: '169f34052c8a40e0adc8813c8d763a0c'
                        deleted: true
                    }
                    'atf-raj-impersonate-admin-check-gates': {
                        table: 'sys_atf_step'
                        id: '5c970e4e2ab4462b9dcba5364355ce14'
                    }
                    'atf-raj-impersonate-admin-nav': {
                        table: 'sys_atf_step'
                        id: '9ae0ce72b558408f9b7be9608b572c8c'
                    }
                    'atf-raj-impersonate-coe': {
                        table: 'sys_atf_step'
                        id: 'dfd1c8d6fedf4466967ff9bbb5ad5d98'
                        deleted: true
                    }
                    'atf-raj-impersonate-coe-actions': {
                        table: 'sys_atf_step'
                        id: '3f03179c6be845939d31acb89b068e0a'
                    }
                    'atf-raj-impersonate-coe-check-submitted': {
                        table: 'sys_atf_step'
                        id: '9ac08e2b56a648998eeb3d255102ff51'
                    }
                    'atf-raj-impersonate-inactive-pm': {
                        table: 'sys_atf_step'
                        id: '6b59ffc66e9e4ef2bd30599905386c6c'
                    }
                    'atf-raj-impersonate-member': {
                        table: 'sys_atf_step'
                        id: 'e05ebe1355f74fd2b5b3f30e7aca35f8'
                        deleted: true
                    }
                    'atf-raj-impersonate-member-setup': {
                        table: 'sys_atf_step'
                        id: '97e4944c61aa4c91a902eb7e411d15b3'
                    }
                    'atf-raj-impersonate-pm': {
                        table: 'sys_atf_step'
                        id: '1184c2b8f0bb4ad891388ffbb01233b4'
                        deleted: true
                    }
                    'atf-raj-impersonate-pm-reject': {
                        table: 'sys_atf_step'
                        id: 'e616877eabd148c08a2184a458957c19'
                    }
                    'atf-raj-inactive-pm-check-no-gates': {
                        table: 'sys_atf_step'
                        id: '52b6bfaba6d949f6ad87c88c06b4c06c'
                    }
                    'atf-raj-inactive-pm-open-submitted': {
                        table: 'sys_atf_step'
                        id: '8726abd43d61408d95d18916f6fccf0e'
                    }
                    'atf-raj-inactive-pm-user': {
                        table: 'sys_atf_step'
                        id: '225812b4762d4044a52833999203336e'
                    }
                    'atf-raj-member-check-no-gate-actions': {
                        table: 'sys_atf_step'
                        id: 'b5d7be1deef04aa8a78a0eb689c9d285'
                    }
                    'atf-raj-member-open-own-submitted': {
                        table: 'sys_atf_step'
                        id: '4e57a62f87324a96984ca46b04ad34fd'
                    }
                    'atf-raj-member-submit': {
                        table: 'sys_atf_step'
                        id: '4441154a98ae4666b5d6f2742d9b4bd8'
                        deleted: true
                    }
                    'atf-raj-member-submit-all': {
                        table: 'sys_atf_step'
                        id: '6d8f24eebfaa43219b2f4cd1c89309f3'
                    }
                    'atf-raj-member-user': {
                        table: 'sys_atf_step'
                        id: '4bdc3abd8b764e55a26649881d6cdf89'
                    }
                    'atf-raj-pm-check-actions': {
                        table: 'sys_atf_step'
                        id: 'e1d384b8c17743a48255388cf9effbb4'
                        deleted: true
                    }
                    'atf-raj-pm-check-fields': {
                        table: 'sys_atf_step'
                        id: 'e17e99d05e564f57bb3e7c11742eda68'
                        deleted: true
                    }
                    'atf-raj-pm-check-sub-1-actions': {
                        table: 'sys_atf_step'
                        id: '7f3d2a47803740abaf4a6a5e4c2dd858'
                    }
                    'atf-raj-pm-check-sub-1-draft-actions': {
                        table: 'sys_atf_step'
                        id: '4ecb4a992cfe49aaa0ea14c36aba0fe7'
                    }
                    'atf-raj-pm-click-approve-sub-2': {
                        table: 'sys_atf_step'
                        id: '99955528292244bab411b7ef63b9c678'
                    }
                    'atf-raj-pm-click-approve-sub-3': {
                        table: 'sys_atf_step'
                        id: '8d2f1cb6d719488ebe12eb643955de90'
                    }
                    'atf-raj-pm-click-reject-sub-1': {
                        table: 'sys_atf_step'
                        id: 'f3b8fa2209434b83b118221a7cb129d6'
                    }
                    'atf-raj-pm-open-sub-1': {
                        table: 'sys_atf_step'
                        id: 'fff44106874a4924a6a841fa3d2feff3'
                    }
                    'atf-raj-pm-open-sub-1-draft': {
                        table: 'sys_atf_step'
                        id: '56cb47a144f740c685109a7d7830b572'
                    }
                    'atf-raj-pm-open-sub-2': {
                        table: 'sys_atf_step'
                        id: 'cd37f24ffe0c47cb81a4a2d13089367a'
                    }
                    'atf-raj-pm-open-sub-3': {
                        table: 'sys_atf_step'
                        id: 'fd9005862dd44a4a9b296c4bbdc6bbfd'
                    }
                    'atf-raj-pm-open-submitted': {
                        table: 'sys_atf_step'
                        id: '2f020394fc814427a3ba809a9b4b8b1d'
                        deleted: true
                    }
                    'atf-raj-pm-user': {
                        table: 'sys_atf_step'
                        id: 'd3f488da65c1484baf2f672038c78591'
                    }
                    'atf-raj-se-admin-user': {
                        table: 'sys_atf_step'
                        id: 'f9cf9d0b10db44ec96a29b237a1c128b'
                    }
                    'atf-raj-validate-sub-1-rejected-draft': {
                        table: 'sys_atf_step'
                        id: '4851b270723641b292a30403051208eb'
                    }
                    'atf-raj-validate-sub-2-completed': {
                        table: 'sys_atf_step'
                        id: '54bf29b8508e4213b68774b6361c4b98'
                    }
                    'atf-raj-validate-sub-2-reviewed': {
                        table: 'sys_atf_step'
                        id: '400da504e54441ee824b20a2a9fc34c6'
                    }
                    'atf-raj-validate-sub-3-draft': {
                        table: 'sys_atf_step'
                        id: '84ba951e590b49d283de8f54974ca18f'
                    }
                    'atf-raj-validate-sub-3-reviewed': {
                        table: 'sys_atf_step'
                        id: '334ef5062bec4175affb7c2144d63385'
                    }
                    'atf-reviewer-admin-journeys': {
                        table: 'sys_atf_test'
                        id: '8092469099ad43939436fabb190c87fb'
                    }
                    'atf-skill-evaluation-suite': {
                        table: 'sys_atf_test_suite'
                        id: 'cf891548944e407ea4c3ce3b1c9439c0'
                    }
                    'atf-submission-cascade-delete': {
                        table: 'sys_atf_test'
                        id: 'a565f090eed24cc49e1dcb27f8d91e63'
                    }
                    'atf-submission-cert-assertions': {
                        table: 'sys_atf_step'
                        id: '1f8cddf7453540a882f5c4ee4a3ae7a4'
                    }
                    'atf-submission-cert-create-member': {
                        table: 'sys_atf_step'
                        id: '915a214e5b4c4a9ea55088acecffe0ae'
                    }
                    'atf-submission-cert-different-insert': {
                        table: 'sys_atf_step'
                        id: '9fccfd3de1a94bfa83200051bf5196da'
                        deleted: true
                    }
                    'atf-submission-cert-duplicate-insert': {
                        table: 'sys_atf_step'
                        id: '389f46abde1c4bc79d92f92e526ea607'
                        deleted: true
                    }
                    'atf-submission-cert-first-insert': {
                        table: 'sys_atf_step'
                        id: '887eb04225c94d869cc42fe269f1effa'
                        deleted: true
                    }
                    'atf-submission-cert-insert-submission': {
                        table: 'sys_atf_step'
                        id: '2c4d7ad88912481e818995a91a043871'
                        deleted: true
                    }
                    'atf-submission-cert-uniqueness': {
                        table: 'sys_atf_test'
                        id: '9c14ad875b1745e2a468365698996f3e'
                    }
                    'atf-submission-completed-immutability': {
                        table: 'sys_atf_test'
                        id: '11d61a3293fb4caa875a2ae58b66202a'
                    }
                    'atf-submission-delete-assertions': {
                        table: 'sys_atf_step'
                        id: 'd78b2beddcf544d78d0b9883c4dbf7d2'
                    }
                    'atf-submission-delete-create-admin': {
                        table: 'sys_atf_step'
                        id: '6556f1186d8440b88d5268ab2936026d'
                    }
                    'atf-submission-delete-create-member': {
                        table: 'sys_atf_step'
                        id: '424f75b4ffa944e88c82164d0d9a8e78'
                    }
                    'atf-submission-delete-impersonate-admin': {
                        table: 'sys_atf_step'
                        id: '3f5cfd93ea7d46458536c5e83d0cd54a'
                    }
                    'atf-submission-delete-insert-cert': {
                        table: 'sys_atf_step'
                        id: 'eff2f1b7d2f14099a28583fe2156a699'
                    }
                    'atf-submission-delete-insert-submission': {
                        table: 'sys_atf_step'
                        id: 'bc8dcab2be944a9cb5b8d755411b9f7e'
                    }
                    'atf-submission-delete-record': {
                        table: 'sys_atf_step'
                        id: '86ee740a27084e1b97bfa3f9507d0edc'
                        deleted: true
                    }
                    'atf-submission-email-notifications': {
                        table: 'sys_atf_test'
                        id: 'fd9d1b4f4fb2422c9711cd1b6fc3976f'
                    }
                    'atf-submission-gates': {
                        table: 'sys_atf_test'
                        id: 'b36bb619745f4ac9982a573806a9b6c3'
                    }
                    'atf-submission-gates-assert-self-approval-refused': {
                        table: 'sys_atf_step'
                        id: '774876baadcf498c8c19d40a9f8d3a46'
                    }
                    'atf-submission-gates-assertions': {
                        table: 'sys_atf_step'
                        id: '9f846652720f448697e475c516ba069b'
                        deleted: true
                    }
                    'atf-submission-gates-coe-approve-1': {
                        table: 'sys_atf_step'
                        id: 'e0808b26b3ed469b8855920d9d9cca11'
                    }
                    'atf-submission-gates-coe-approve-final': {
                        table: 'sys_atf_step'
                        id: 'bbdfc3bc18e643c7b04d320887fc056c'
                    }
                    'atf-submission-gates-coe-reject-2': {
                        table: 'sys_atf_step'
                        id: '60c2df0431524f6e89b42035a72c267c'
                    }
                    'atf-submission-gates-create-coe': {
                        table: 'sys_atf_step'
                        id: '662e98461a3347629bd5d439ccf493d3'
                    }
                    'atf-submission-gates-create-member': {
                        table: 'sys_atf_step'
                        id: '8960d14965984a64bc2a6247fd6fa6c2'
                    }
                    'atf-submission-gates-create-pm': {
                        table: 'sys_atf_step'
                        id: '22445169193b4bae912717c011d7cbcf'
                    }
                    'atf-submission-gates-impersonate-coe-1': {
                        table: 'sys_atf_step'
                        id: '0e349ef379294be58ba46b649b613ae5'
                    }
                    'atf-submission-gates-impersonate-coe-2': {
                        table: 'sys_atf_step'
                        id: '615e9ef9554043e791ccd882a62f17ec'
                    }
                    'atf-submission-gates-impersonate-coe-final': {
                        table: 'sys_atf_step'
                        id: 'fcfbccdf42494429b1d91567a940cc54'
                    }
                    'atf-submission-gates-impersonate-member-1': {
                        table: 'sys_atf_step'
                        id: '3734bedf7a344a418b5b6f6d60a6ea79'
                    }
                    'atf-submission-gates-impersonate-member-2': {
                        table: 'sys_atf_step'
                        id: 'c439986ae33245c1b27b871689d3126b'
                    }
                    'atf-submission-gates-impersonate-member-3': {
                        table: 'sys_atf_step'
                        id: '8b351499776b4e69bc92ee33fd237101'
                    }
                    'atf-submission-gates-impersonate-member-4': {
                        table: 'sys_atf_step'
                        id: '02986b402a8f48a98aac864eb26fd040'
                    }
                    'atf-submission-gates-impersonate-pm-1': {
                        table: 'sys_atf_step'
                        id: '469eb58b8e5b484187e64816367591d0'
                    }
                    'atf-submission-gates-impersonate-pm-2': {
                        table: 'sys_atf_step'
                        id: 'ae0eb0ce05044fcd8cc89655aa1826c1'
                    }
                    'atf-submission-gates-impersonate-pm-3': {
                        table: 'sys_atf_step'
                        id: '2de5998f7d5c4b0087be2ef4b5c4acf2'
                    }
                    'atf-submission-gates-impersonate-pm-4': {
                        table: 'sys_atf_step'
                        id: '8d389806e1bd445ab0dbc98087e00bd3'
                    }
                    'atf-submission-gates-impersonate-pm-self-approval': {
                        table: 'sys_atf_step'
                        id: '5dfaf6217ef444bd994cc88bf30749eb'
                    }
                    'atf-submission-gates-insert-first-submission': {
                        table: 'sys_atf_step'
                        id: '4f3642ec1add414a9b5a9dc499ae8c24'
                    }
                    'atf-submission-gates-member-insert-and-submit-2': {
                        table: 'sys_atf_step'
                        id: '426f25a0ea4841fe9344bd74d870872f'
                    }
                    'atf-submission-gates-member-resubmit-2': {
                        table: 'sys_atf_step'
                        id: 'dbc5ba1362624ff09d20b607539ca1cf'
                    }
                    'atf-submission-gates-member-resubmit-final': {
                        table: 'sys_atf_step'
                        id: 'a2a1d61feef3415b93e8bbd2053f8c1e'
                    }
                    'atf-submission-gates-member-submit-1': {
                        table: 'sys_atf_step'
                        id: '91a59f7bc4ce4f7f84e7aa66e97da74d'
                    }
                    'atf-submission-gates-pm-approve-1': {
                        table: 'sys_atf_step'
                        id: '7599e1a63ee445079291f2895e805e7f'
                    }
                    'atf-submission-gates-pm-approve-and-coe-reject-prep': {
                        table: 'sys_atf_step'
                        id: '646a68dc34de4c9cbed04e37099d6b4d'
                    }
                    'atf-submission-gates-pm-approve-final': {
                        table: 'sys_atf_step'
                        id: 'b019657a8b6f4f5ea7559d2f942348c0'
                    }
                    'atf-submission-gates-pm-reject-2': {
                        table: 'sys_atf_step'
                        id: '7b3bc241dff54536a40ee7103eee110e'
                    }
                    'atf-submission-insert-and-in-progress': {
                        table: 'sys_atf_test'
                        id: '73c4b87499734eb4b4d1b966fef33e5f'
                    }
                    'atf-submission-insert-assertions': {
                        table: 'sys_atf_step'
                        id: '8c828e0824a6473192b72f271996f5f2'
                    }
                    'atf-submission-insert-create-member': {
                        table: 'sys_atf_step'
                        id: '263b2e9e951c44fbbf6613322c3e2af1'
                    }
                    'atf-submission-insert-first-submission': {
                        table: 'sys_atf_step'
                        id: '7fb217a124294c68bb160e659dce2cc0'
                    }
                    'atf-submission-insert-second-submission': {
                        table: 'sys_atf_step'
                        id: '7d7c937fb34443098c3a1d96d37b80e4'
                    }
                    'atf-submission-lock-assert-desc-update-refused': {
                        table: 'sys_atf_step'
                        id: '349981c3cfd140b89c69f71f77d55f82'
                    }
                    'atf-submission-lock-assert-work-notes-refused': {
                        table: 'sys_atf_step'
                        id: '43e26ea894564c55ae25ad21c883b3f8'
                    }
                    'atf-submission-lock-assertions': {
                        table: 'sys_atf_step'
                        id: '09bc792283ce48c2a845bbf55813f2e8'
                        deleted: true
                    }
                    'atf-submission-lock-coe-approve': {
                        table: 'sys_atf_step'
                        id: '8b52a2d012b5494593182dbd597a36ef'
                    }
                    'atf-submission-lock-create-coe': {
                        table: 'sys_atf_step'
                        id: '8d4b8d5b88f042c28a70a80eacf8e2f7'
                    }
                    'atf-submission-lock-create-member': {
                        table: 'sys_atf_step'
                        id: '6d2b5496d96b456893271d788ce29481'
                    }
                    'atf-submission-lock-create-pm': {
                        table: 'sys_atf_step'
                        id: '168034dbfea64f38b53f7f2ea92f9c34'
                    }
                    'atf-submission-lock-impersonate-coe': {
                        table: 'sys_atf_step'
                        id: '3b582d98689b45bc94596dd480072037'
                    }
                    'atf-submission-lock-impersonate-member-for-update': {
                        table: 'sys_atf_step'
                        id: 'fdd3dc71e1a649b78d1d97e70267632a'
                    }
                    'atf-submission-lock-impersonate-member-initial': {
                        table: 'sys_atf_step'
                        id: '0e8587e0111f4a0ca988939746138559'
                    }
                    'atf-submission-lock-impersonate-pm': {
                        table: 'sys_atf_step'
                        id: '5da9b69fe3234f3b8257a33fec75e6b3'
                    }
                    'atf-submission-lock-impersonate-pm-for-work-notes': {
                        table: 'sys_atf_step'
                        id: 'd9fc1efe99d045a090d223a22f5c843a'
                    }
                    'atf-submission-lock-insert-submission': {
                        table: 'sys_atf_step'
                        id: 'bd707daf07a347d0aef544627cdf88ae'
                    }
                    'atf-submission-lock-member-submit': {
                        table: 'sys_atf_step'
                        id: '2a215b036450427a8208abfd658ca8b3'
                    }
                    'atf-submission-lock-pm-approve': {
                        table: 'sys_atf_step'
                        id: 'f3c2176f5fc943608bfd84b54245da6e'
                    }
                    'atf-submission-member-query-isolation': {
                        table: 'sys_atf_test'
                        id: 'a8a82f22be2a4b21964113b9641b252f'
                    }
                    'atf-submission-query-assertions': {
                        table: 'sys_atf_step'
                        id: 'ea409ed4745440b997e378011c7a81f8'
                    }
                    'atf-submission-query-impersonate-member-1': {
                        table: 'sys_atf_step'
                        id: '040ab3ce99ea4041981375e1ea979dae'
                    }
                    'atf-submission-query-insert-sub-1': {
                        table: 'sys_atf_step'
                        id: 'a176a145baa643c08089101a393b0d6c'
                    }
                    'atf-submission-query-insert-sub-2': {
                        table: 'sys_atf_step'
                        id: '21b6a3f4018a44179179f67d3547b907'
                    }
                    'atf-submission-query-member-1': {
                        table: 'sys_atf_step'
                        id: 'c40fc761e4324841a66feaa6206f5fa9'
                    }
                    'atf-submission-query-member-2': {
                        table: 'sys_atf_step'
                        id: '8914a6fbc1d340e1b5f5123307474703'
                    }
                    'atf-submission-score-assertions': {
                        table: 'sys_atf_step'
                        id: 'd583022a45254c568b3775c16fedf60a'
                    }
                    'atf-submission-score-create-member': {
                        table: 'sys_atf_step'
                        id: 'd19ed67160ec483987246740163e8a2e'
                    }
                    'atf-submission-score-insert-submission': {
                        table: 'sys_atf_step'
                        id: '7b6fe367394a46a89be952d86ee1fb0b'
                    }
                    'atf-submission-score-recalculation': {
                        table: 'sys_atf_test'
                        id: '815cffdcc8a94abb9d387c1bf48183de'
                    }
                    'atf-submission-submit-assert-empty-desc': {
                        table: 'sys_atf_step'
                        id: '42e8e5e5c0e744209fdba2480846cab0'
                    }
                    'atf-submission-submit-assert-non-assigned': {
                        table: 'sys_atf_step'
                        id: '6c46b4ffca2b47279efb1ca27cbaf306'
                    }
                    'atf-submission-submit-assert-success': {
                        table: 'sys_atf_step'
                        id: 'dc00065433214dab90427eb8e81f5437'
                    }
                    'atf-submission-submit-assertions': {
                        table: 'sys_atf_step'
                        id: '7b9ba0441f3b4ff495a91edb7d8bde24'
                        deleted: true
                    }
                    'atf-submission-submit-create-member': {
                        table: 'sys_atf_step'
                        id: '4f4dda8b82de4020b3e51be3f9c1a50b'
                    }
                    'atf-submission-submit-create-other-user': {
                        table: 'sys_atf_step'
                        id: '6fb1e8e656394e298a12fb4cda569f4d'
                    }
                    'atf-submission-submit-for-review': {
                        table: 'sys_atf_test'
                        id: '9c06a18b251a4dd7b1e26200415a488a'
                    }
                    'atf-submission-submit-impersonate-member-final': {
                        table: 'sys_atf_step'
                        id: 'cde0b950810c409abfb51135235b3b22'
                    }
                    'atf-submission-submit-impersonate-member-initial': {
                        table: 'sys_atf_step'
                        id: '3a6c0bf3c8604fcab96d5cc50040ab28'
                    }
                    'atf-submission-submit-impersonate-other': {
                        table: 'sys_atf_step'
                        id: '51dd19cbd40443e1af31799291225128'
                    }
                    'atf-submission-submit-insert-submission': {
                        table: 'sys_atf_step'
                        id: 'a77e723c483148e9bc32bc04575cb21a'
                    }
                    'atf-submission-submit-set-valid-desc': {
                        table: 'sys_atf_step'
                        id: '3066a90f162c4cab953ac361ea61e38b'
                    }
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
                        deleted: false
                    }
                    'cert-acquisition-write-se-user-own': {
                        table: 'sys_security_acl'
                        id: '0e6da5983e5448d5b0040db511c4d221'
                        deleted: false
                    }
                    'certificate-application-developer': {
                        table: 'x_711398_se_certificate'
                        id: '3e23d94badd34acc95ddce900819144e'
                        deleted: true
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
                        deleted: true
                    }
                    'certificate-read-se-user': {
                        table: 'sys_security_acl'
                        id: 'ec29ee65edb349d3a05338b55913a496'
                    }
                    'certificate-system-administrator': {
                        table: 'x_711398_se_certificate'
                        id: '66d65426f9724e309a30ef4d996acf29'
                        deleted: true
                    }
                    'certificate-write-se-admin': {
                        table: 'sys_security_acl'
                        id: '0206fb7425844194a6cd7498fffbf753'
                    }
                    'certificates-data-source': {
                        table: 'sys_data_source'
                        id: '634664031c9147f3a8ca5d4bf01127e7'
                    }
                    'certificates-import-set': {
                        table: 'sys_transform_map'
                        id: '15df75777d484d598f26cca5929cb853'
                    }
                    'coe-approve-submission': {
                        table: 'sys_ui_action'
                        id: '35046450d8b44c05aac3a9d6acfcd8a4'
                    }
                    'coe-reject-submission': {
                        table: 'sys_ui_action'
                        id: 'f8eea6a97daa46debc62052537a6fbc8'
                    }
                    'event-submission-coe-rejected': {
                        table: 'sysevent_register'
                        id: 'cb34e16d0a5b46a08e06eece32a53dba'
                    }
                    'event-submission-created': {
                        table: 'sysevent_register'
                        id: '3e119278dd2d4a0aa7c325bf9cb00bb0'
                    }
                    'event-submission-pm-approved': {
                        table: 'sysevent_register'
                        id: 'f9e8c48517774fb2a43c9e400a37cf29'
                    }
                    'event-submission-pm-rejected': {
                        table: 'sysevent_register'
                        id: 'e6a25a1d29b5447d970f5c45509a23dd'
                    }
                    'event-submission-submitted': {
                        table: 'sysevent_register'
                        id: 'e6bc0fb72170489a8f1de66819fa8cc3'
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
                    'module-completed-submissions': {
                        table: 'sys_app_module'
                        id: 'afb5cfa61594405ea08d6f92cae79321'
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
                    'notification-submission-coe-rejected': {
                        table: 'sysevent_email_action'
                        id: '1a79f0b0ca094b2a9050448abeacad84'
                    }
                    'notification-submission-created': {
                        table: 'sysevent_email_action'
                        id: '4142ea83dc704732b1d0180ff665ef4e'
                    }
                    'notification-submission-pm-approved': {
                        table: 'sysevent_email_action'
                        id: 'b22dea6b3a2046068fd9ceaecc94b6d4'
                    }
                    'notification-submission-pm-rejected': {
                        table: 'sysevent_email_action'
                        id: '27479c75dc3d426a95e69e2b3ed3c6a8'
                    }
                    'notification-submission-submitted': {
                        table: 'sysevent_email_action'
                        id: 'bd64f14f5ea44509af8ddef17f7aeea4'
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
                    'product-line-csm': {
                        table: 'x_711398_se_product_line'
                        id: 'e83b0fbf8b24498a83a3670a587d63ec'
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
                    'product-line-hr': {
                        table: 'x_711398_se_product_line'
                        id: '106bf7641550453997943b99717d99fd'
                    }
                    'product-line-itbm': {
                        table: 'x_711398_se_product_line'
                        id: '8e4912187938461a86a9f9da1eaec7d3'
                    }
                    'product-line-itom': {
                        table: 'x_711398_se_product_line'
                        id: '5491519ac08446d289daa2aea301e347'
                    }
                    'product-line-itsm': {
                        table: 'x_711398_se_product_line'
                        id: '8f6092b53773486d91ad01bf461705bc'
                    }
                    'product-line-nonstop-cloud': {
                        table: 'x_711398_se_product_line'
                        id: 'c73ab26ddc714bc0ae645bafb84dba5e'
                    }
                    'product-line-platform': {
                        table: 'x_711398_se_product_line'
                        id: 'e70f6ac6274f4a81ad6cda2486b5af5b'
                    }
                    'product-line-read-se-user': {
                        table: 'sys_security_acl'
                        id: '6d52c0ed5fb7452e9dae37bd1130ae9e'
                    }
                    'product-line-security': {
                        table: 'x_711398_se_product_line'
                        id: '9c8ab9d7fbbe4c9a8bc8407c3409928e'
                    }
                    'product-line-write-se-admin': {
                        table: 'sys_security_acl'
                        id: 'b3fbef6b862e494fad7800a971d71f42'
                    }
                    'queue-submission-insert-event': {
                        table: 'sys_script'
                        id: '3996e97d1844461590ef0ce82d394971'
                    }
                    'queue-submission-update-event': {
                        table: 'sys_script'
                        id: 'd98813f2b662487c89d1c96236f9b8fd'
                    }
                    'recalculate-submission-score': {
                        table: 'sys_script'
                        id: '467e29b2730047cebdc83d408d9ceb29'
                    }
                    'refuse-completed-mutation': {
                        table: 'sys_script'
                        id: '10ea6a2de3464041aa6ae2e18e38a1b2'
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
                        deleted: true
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
                        deleted: true
                    }
                    'skill-itsm-process': {
                        table: 'x_711398_se_skill'
                        id: '8ffe0cf2dc5c4b009fe24cae9860e35c'
                        deleted: true
                    }
                    'skill-platform-architecture': {
                        table: 'x_711398_se_skill'
                        id: '08ae46c2499f4a44b80638ee9e19b951'
                        deleted: true
                    }
                    'skill-read-se-user': {
                        table: 'sys_security_acl'
                        id: '16cd205884064dc095112c7db06208a5'
                    }
                    'skill-write-scripts': {
                        table: 'x_711398_se_skill'
                        id: 'ab37e817a58c41cd87cf135006a1e4d9'
                        deleted: true
                    }
                    'skill-write-se-admin': {
                        table: 'sys_security_acl'
                        id: '68d6f8e721914284b22f2516ede2e57a'
                    }
                    'skills-data-source': {
                        table: 'sys_data_source'
                        id: '793c27e18460464ea0f2dab24abaaf6e'
                    }
                    'skills-import-set': {
                        table: 'sys_transform_map'
                        id: 'f4c3556260e34271adcf3d9a80d22527'
                    }
                    'src_server_access-roles_ts': {
                        table: 'sys_module'
                        id: 'a84152ec5527418ba88189595418a05b'
                        deleted: true
                    }
                    'src_server_cert-acquisition_refuse-duplicate-cert-acquisition_ts': {
                        table: 'sys_module'
                        id: '15d1cfd4cf00435caa372d7b25393781'
                    }
                    'src_server_cert-acquisition_restrict-member-cert-acquisition-query_ts': {
                        table: 'sys_module'
                        id: 'ea29b97ce14247de99f694af51f8418e'
                    }
                    'src_server_common_access-roles_ts': {
                        table: 'sys_module'
                        id: '8e0f2d962d7f4c32a39957a8d79b4110'
                    }
                    'src_server_common_group-names_ts': {
                        table: 'sys_module'
                        id: '78b3c1cbca5c4923ab531669de06a4ac'
                    }
                    src_server_common_prelude_ts: {
                        table: 'sys_module'
                        id: '63ff36d4317d4798ad95116028761627'
                    }
                    'src_server_generate-skill-assessments_ts': {
                        table: 'sys_module'
                        id: '2142872a408a4f5586318c538e19bc25'
                        deleted: true
                    }
                    'src_server_group-names_ts': {
                        table: 'sys_module'
                        id: '04e94114ec43446aa51ddc0b77121a59'
                        deleted: true
                    }
                    src_server_prelude_ts: {
                        table: 'sys_module'
                        id: 'ff3047c022b5468697a49dbcfffa9ea0'
                        deleted: true
                    }
                    'src_server_queue-submission-events_ts': {
                        table: 'sys_module'
                        id: '5232f46267a44bea85c71ae69ca85522'
                        deleted: true
                    }
                    'src_server_recalculate-submission-score_ts': {
                        table: 'sys_module'
                        id: 'b56d5644e7c446cea30b453b38c1e90f'
                        deleted: true
                    }
                    'src_server_refuse-completed-mutation_ts': {
                        table: 'sys_module'
                        id: 'be16d279bea14424a2ffa054a104b38b'
                        deleted: true
                    }
                    'src_server_refuse-duplicate-cert-acquisition_ts': {
                        table: 'sys_module'
                        id: '1a39610c6064443d80f4bbf6d179f3bc'
                        deleted: true
                    }
                    'src_server_refuse-extra-skill-assessment-insert_ts': {
                        table: 'sys_module'
                        id: 'f952e6b81a1c47709ca79d504cc71f0f'
                        deleted: true
                    }
                    'src_server_refuse-in-progress-insert_ts': {
                        table: 'sys_module'
                        id: 'c3a190f029ed473ea7a8967bcb539685'
                        deleted: true
                    }
                    'src_server_restrict-member-cert-acquisition-query_ts': {
                        table: 'sys_module'
                        id: 'dbe7365aaec94ff3a18a918d68618075'
                        deleted: true
                    }
                    'src_server_restrict-member-skill-assessment-query_ts': {
                        table: 'sys_module'
                        id: 'cd7053116147401f9232af1a99598486'
                        deleted: true
                    }
                    'src_server_restrict-member-submission-query_ts': {
                        table: 'sys_module'
                        id: 'ec4baab63539417283f3f63c9683e743'
                        deleted: true
                    }
                    'src_server_skill-assessment_generate-skill-assessments_ts': {
                        table: 'sys_module'
                        id: '4a55400f829649959d67eccdca018a67'
                    }
                    'src_server_skill-assessment_refuse-extra-skill-assessment-insert_ts': {
                        table: 'sys_module'
                        id: '9168bcd0fbb34aec849b5e147aa2f348'
                    }
                    'src_server_skill-assessment_restrict-member-skill-assessment-query_ts': {
                        table: 'sys_module'
                        id: 'bc374a2f702d4b25a4f54fd650da8a21'
                    }
                    'src_server_submission_queue-submission-events_ts': {
                        table: 'sys_module'
                        id: 'd8febb4ac1d4435ea095b7253ad182a4'
                    }
                    'src_server_submission_recalculate-submission-score_ts': {
                        table: 'sys_module'
                        id: '19f5a931b34744e992d9adb0c096db64'
                    }
                    'src_server_submission_refuse-completed-mutation_ts': {
                        table: 'sys_module'
                        id: '3a0e2ff0e451475bac1dc71ca73adb97'
                    }
                    'src_server_submission_refuse-in-progress-insert_ts': {
                        table: 'sys_module'
                        id: 'd04033a47ae84957acdbba331019808b'
                    }
                    'src_server_submission_restrict-member-submission-query_ts': {
                        table: 'sys_module'
                        id: 'c3652c125c0346589e6e910ca5739694'
                    }
                    'src_server_submission_submission-policy_ts': {
                        table: 'sys_module'
                        id: '2f60650fcb724e619087def307ab169f'
                    }
                    'src_server_submission_submit-for-review_ts': {
                        table: 'sys_module'
                        id: 'f98bb3a51bd3450ba87bfbfd72235412'
                    }
                    'src_server_submission_take-coe-gate_ts': {
                        table: 'sys_module'
                        id: 'fd4822cc84ac4fe8a585608616cf64e6'
                    }
                    'src_server_submission_take-pm-gate_ts': {
                        table: 'sys_module'
                        id: '0f4a748eebef40a2ac3ff3c71c0171da'
                    }
                    'src_server_submission-policy_ts': {
                        table: 'sys_module'
                        id: 'e58387ead6be4440a382432a0bd3a611'
                        deleted: true
                    }
                    'src_server_submit-for-review_ts': {
                        table: 'sys_module'
                        id: '0a775208fe4941aba9f2a3c83a3215c8'
                        deleted: true
                    }
                    'src_server_take-coe-gate_ts': {
                        table: 'sys_module'
                        id: 'e84b97e1673a4fbfb712b46f055fac00'
                        deleted: true
                    }
                    'src_server_take-pm-gate_ts': {
                        table: 'sys_module'
                        id: 'fa0e0bc980944bfca45887f536535976'
                        deleted: true
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
                    'submission-email-link-script': {
                        table: 'sys_script_email'
                        id: '12714e586d004c75b114a17b0812ad58'
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
                    'submission-state-write': {
                        table: 'sys_security_acl'
                        id: 'bac45931e7f44babaf41b7840389f8d5'
                    }
                    'submission-valid-write': {
                        table: 'sys_security_acl'
                        id: '849760f3783047aa9aeb034a0c84f6b3'
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
                        table: 'sys_variable_value'
                        id: '000316fad6344f0982e7546562059cd0'
                        key: {
                            document_key: '8d389806e1bd445ab0dbc98087e00bd3'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '00391d9c94da4fcd9c604af28b2973a8'
                        key: {
                            document_key: '35c0b6af68db462faa74c1c0e8be8659'
                            variable: 'b6d2b40c73720300c79260bdfaf6a786'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '003bbc2767bc4a33b1f36c93f8ed573c'
                        key: {
                            document_key: '263b2e9e951c44fbbf6613322c3e2af1'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '00d0e656a7db4676aa46936528ac6b03'
                        key: {
                            document_key: 'c145f1f940934d9185bb1a7c09a9a34b'
                            variable: '6e55da4e53a0220002c6435723dc34a0'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '01990f6bbe93403e9b08328a52aef5ba'
                        key: {
                            document_key: 'a2aad9fc482741f59bd0e83beb4ccf8e'
                            variable: '787a9b535320220002c6435723dc3455'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '01ab8c64f3904739996fe036249160ee'
                        key: {
                            document_key: '2c5d9925b63541b4a9b043330f789427'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '022c4961079d405f9dbedb1e35679287'
                        key: {
                            id: '8d389806e1bd445ab0dbc98087e00bd3'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
                        }
                    },
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
                        table: 'sys_variable_value'
                        id: '02574793216e4801ac1272d7a2544d36'
                        key: {
                            document_key: '8d2f1cb6d719488ebe12eb643955de90'
                            variable: '3eee292353e0220002c6435723dc343c'
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
                        table: 'sys_variable_value'
                        id: '029f0ec510a54b14b2addcf6905b4d63'
                        key: {
                            document_key: 'dfcded0f9c5d4aaf8cfee79536f435c8'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
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
                        table: 'sys_element_mapping'
                        id: '0374def62898465ea007a2e597149b98'
                        deleted: true
                        key: {
                            id: '86ee740a27084e1b97bfa3f9507d0edc'
                            table: 'var__m_atf_input_variable_8df72288df60220062fe6c7a4df2636d'
                            field: 'record_id'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '03b628138f764537b53811fb28b00ee3'
                        key: {
                            document_key: 'fff44106874a4924a6a841fa3d2feff3'
                            variable: '17d732a9c7a333005e5c45b881c26007'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '04249b601cbb4ed1b14174353b1823a6'
                        key: {
                            document_key: '168034dbfea64f38b53f7f2ea92f9c34'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '04861cabf7ad4009899bd8d7e5f65de8'
                        key: {
                            id: '8b351499776b4e69bc92ee33fd237101'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '04b83f9200be452aa5659ab0d7b12574'
                        key: {
                            document_key: '99955528292244bab411b7ef63b9c678'
                            variable: '334ea2f153212110248dddeeff7b1255'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '06487d470c6743e7bf47cf635902fc40'
                        key: {
                            document_key: 'c40fc761e4324841a66feaa6206f5fa9'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '068246de757a4b1bb0572d41614ed2c8'
                        key: {
                            document_key: '56cb47a144f740c685109a7d7830b572'
                            variable: '6e55da4e53a0220002c6435723dc34a0'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '06f4304ed0cb46f2a2a58fc00e536904'
                        key: {
                            document_key: '168034dbfea64f38b53f7f2ea92f9c34'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
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
                        table: 'sys_variable_value'
                        id: '076907c6c5ed4070983606f78ef25f0b'
                        key: {
                            document_key: '4f3642ec1add414a9b5a9dc499ae8c24'
                            variable: 'e6e3c7535320220002c6435723dc3496'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '07778697740545728ed960b2243d036c'
                        key: {
                            document_key: '0eb9d9b020514786af8960894abc5087'
                            variable: '932d14a33756030064a52f3c8e41f120'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '078ae9c7741c439e824edb9b43486963'
                        key: {
                            document_key: '6d2b5496d96b456893271d788ce29481'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '07d0c84c275644bfb8e203176557d7cf'
                        key: {
                            document_key: '040ab3ce99ea4041981375e1ea979dae'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '07e33c43e8f14398b743a816361962fc'
                        deleted: true
                        key: {
                            document_key: '9f846652720f448697e475c516ba069b'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '0820f0d8ab2947268d8b73ff8ba81d99'
                        key: {
                            document_key: '84ba951e590b49d283de8f54974ca18f'
                            variable: '52ed1e5b5360220002c6435723dc3421'
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
                        table: 'sys_variable_value'
                        id: '09017f13d99a412b8f21ecb4e7bed50d'
                        key: {
                            document_key: '7b3bc241dff54536a40ee7103eee110e'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '0920baa92c874387a26cee1557703d97'
                        key: {
                            document_key: 'e6438ba894ff4c0dbfc238889a3d3c11'
                            variable: '80f953535320220002c6435723dc340f'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '093b1a722cb142968e56bc15226ffc1e'
                        key: {
                            document_key: '73216deb3c174feb87f64bcfaaeef22a'
                            variable: '3eee292353e0220002c6435723dc343c'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '09424a5d4c1545648dac02d72f598df6'
                        deleted: true
                        key: {
                            id: 'eff2f1b7d2f14099a28583fe2156a699'
                            table: 'var__m_atf_input_variable_14872288df60220062fe6c7a4df26319'
                            field: 'field_values'
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
                        table: 'sys_variable_value'
                        id: '0971c28de32444f1b3bf85ac54fb40c3'
                        key: {
                            document_key: '991ec0ae3429451680c81eac0d702a37'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '09c6a0124b4344febd521f0f83f8e8f6'
                        deleted: true
                        key: {
                            document_key: 'e05ebe1355f74fd2b5b3f30e7aca35f8'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '09e9590d9fe343339da4d49633d660a0'
                        key: {
                            document_key: 'e6438ba894ff4c0dbfc238889a3d3c11'
                            variable: '0cd9df135320220002c6435723dc3426'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '0a63c8c589834a0381f0c4374f6603b3'
                        key: {
                            document_key: '6d2b5496d96b456893271d788ce29481'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '0a74f6d7d5a84e92bd4100d350121dac'
                        key: {
                            document_key: '4e57a62f87324a96984ca46b04ad34fd'
                            variable: 'ad351a4e53a0220002c6435723dc34f0'
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
                        table: 'sys_variable_value'
                        id: '0adf86f349f64ddbb52a0fb852b655e9'
                        key: {
                            document_key: '8960d14965984a64bc2a6247fd6fa6c2'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '0aefa3503b0447618f3f0672763cc5ed'
                        key: {
                            document_key: '85950516a5c54930a116b9638ddd8ebc'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '0b139af0012d40f088402f7e2c1ec259'
                        key: {
                            document_key: '8914a6fbc1d340e1b5f5123307474703'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0b4d3c2f41264f5fb4aa2aacbb095494'
                        key: {
                            name: 'x_711398_se_certificates_staging'
                            element: 'u_product_line'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '0b77bc39fe964f4a960c5602afaef1e9'
                        key: {
                            document_key: '6d2b5496d96b456893271d788ce29481'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '0c702251575e4709809184536300410b'
                        key: {
                            document_key: 'a176a145baa643c08089101a393b0d6c'
                            variable: 'e6e3c7535320220002c6435723dc3496'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '0ca2462bc1f44c43b46b09b4f19eab04'
                        key: {
                            document_key: 'fd9005862dd44a4a9b296c4bbdc6bbfd'
                            variable: 'ad351a4e53a0220002c6435723dc34f0'
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
                        table: 'sys_variable_value'
                        id: '0cddea96a16b4214a7cd8a61306b68a1'
                        key: {
                            document_key: '7b6fe367394a46a89be952d86ee1fb0b'
                            variable: '90144b535320220002c6435723dc3488'
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
                        table: 'sys_security_acl_role'
                        id: '0d4fae5a4ea742ec83337170924d7167'
                        key: {
                            sys_security_acl: 'bac45931e7f44babaf41b7840389f8d5'
                            sys_user_role: {
                                id: '510864fdf2b84952a7595fe5e602132e'
                                key: {
                                    name: 'x_711398_se.se_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '0d749f85737744f1b830af9e4ec7dc93'
                        key: {
                            id: '646a68dc34de4c9cbed04e37099d6b4d'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '0db2193525944f6dbd521a4aa48aaf14'
                        key: {
                            id: '8cf561ab50f54508903badc6d5c3fcb1'
                            table: 'var__m_atf_input_variable_5f2e0e535332120028bc29cac2dc34d3'
                            field: 'record_id'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '0e8992a765bb4c2cba294d59abc7d8a2'
                        key: {
                            document_key: 'cd37f24ffe0c47cb81a4a2d13089367a'
                            variable: 'b124164e53a0220002c6435723dc34c5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '0e9eb6d8e5ae42519d6e9734b6314d8d'
                        key: {
                            document_key: '1dd8456248db44909763e1a86c8674a7'
                            variable: '17d732a9c7a333005e5c45b881c26007'
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
                        table: 'sys_variable_value'
                        id: '0f16d63994fd4b43a4859f4b9a17134f'
                        key: {
                            document_key: '6a59045bbe5f489091846d05e1c05c74'
                            variable: 'c796d40497302200abe4bb7503ac4ad8'
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
                        table: 'sys_variable_value'
                        id: '0fa1e3dbad6b4ae4b6cbc9a2507e1f87'
                        key: {
                            document_key: 'a0152d37cbf34736b3987a85e9b8598f'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
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
                        table: 'sys_variable_value'
                        id: '103b7050d7b447ed8606689f753ee9e1'
                        key: {
                            document_key: 'ec5a6d890fce455d9df8d6f7f773b4d2'
                            variable: '6619c7aa5320220002c6435723dc34e2'
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
                        table: 'sys_variable_value'
                        id: '10c962cf87014a009c36a27962fc4578'
                        key: {
                            document_key: 'd3f488da65c1484baf2f672038c78591'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
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
                        table: 'sys_element_mapping'
                        id: '1104e577cccf468d99d7f9f51e16ae5c'
                        deleted: true
                        key: {
                            id: '4441154a98ae4666b5d6f2742d9b4bd8'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '11f30fb8bfd74a2fb3dafe6211875497'
                        key: {
                            id: '4851b270723641b292a30403051208eb'
                            table: 'var__m_atf_input_variable_1f39a288df60220062fe6c7a4df2639d'
                            field: 'record_id'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '122b37c97d9d4363be6bdda7078d16cf'
                        key: {
                            id: '3f03179c6be845939d31acb89b068e0a'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '1255a1f92c4d435cad0d0b5e239f14de'
                        key: {
                            document_key: '0eb9d9b020514786af8960894abc5087'
                            variable: '90749dd73702030064a52f3c8e41f12d'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '12b46c177a3b40b78de1ca0625336463'
                        key: {
                            document_key: '1dd8456248db44909763e1a86c8674a7'
                            variable: '74d6e7a0a3023110571967d1361e616b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '139054e6d5604d399c6785479cd050bd'
                        deleted: true
                        key: {
                            document_key: '2f020394fc814427a3ba809a9b4b8b1d'
                            variable: 'c2eb56e853422110248dddeeff7b1261'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '13c8f7db93f644e881c96e495f917902'
                        key: {
                            document_key: '915a214e5b4c4a9ea55088acecffe0ae'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '13f32d51115c419f83f4c9772eb70301'
                        key: {
                            document_key: '424f75b4ffa944e88c82164d0d9a8e78'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '147bfcc9bced4ff288ac126e3648d3c5'
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
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '1494437f83834b2c93b448e781f4192d'
                        key: {
                            document_key: 'f8e3a00413d54bfc9eff8774283111e7'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '14d4674c40664c9da0772621b16f3d64'
                        key: {
                            document_key: '8960d14965984a64bc2a6247fd6fa6c2'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '14e966e565f545b48373e9c1a7563635'
                        key: {
                            document_key: 'fd9005862dd44a4a9b296c4bbdc6bbfd'
                            variable: '74d6e7a0a3023110571967d1361e616b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '14eae04abb234c7a912a3005614c5149'
                        key: {
                            document_key: '73216deb3c174feb87f64bcfaaeef22a'
                            variable: '7600f16353e0220002c6435723dc34d5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '15e827bd393d4ab6b87873584627443f'
                        deleted: true
                        key: {
                            document_key: '86ee740a27084e1b97bfa3f9507d0edc'
                            variable: '8f7d0f935320220002c6435723dc3471'
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
                        table: 'sys_variable_value'
                        id: '163ba128db03409999751c37eda93605'
                        key: {
                            document_key: 'f8e3a00413d54bfc9eff8774283111e7'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
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
                        table: 'sys_variable_value'
                        id: '179f2e864f5d41429237fe1ccf51260d'
                        key: {
                            document_key: 'a994165cead24f6cbccebd95d55cf250'
                            variable: '6aad5a575360220002c6435723dc34b0'
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
                        table: 'sys_variable_value'
                        id: '1862266203304a1b9c4f9ce991304fca'
                        key: {
                            document_key: '8cf561ab50f54508903badc6d5c3fcb1'
                            variable: 'ad351a4e53a0220002c6435723dc34f0'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '187cca9c06094150a4373d5759b076c2'
                        key: {
                            document_key: '5e467dde917240a9859a9861332b2452'
                            variable: '946f3c1a0f23330072e6452bc4767eda'
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
                        table: 'sys_variable_value'
                        id: '191e4bfe801f4d58819f0a53bd82009f'
                        key: {
                            document_key: 'f58cb2b8878a4634a793ef63c0fce5b6'
                            variable: 'dd54cf535320220002c6435723dc34fd'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '1941920c79b243a58abc156bafaca2a9'
                        deleted: true
                        key: {
                            document_key: 'eff2f1b7d2f14099a28583fe2156a699'
                            variable: 'e6e3c7535320220002c6435723dc3496'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '195b22beea8e46228ed4f49b2e545b9a'
                        key: {
                            id: '3b582d98689b45bc94596dd480072037'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '196f97c2157340c181a6fabf2d6fe7a3'
                        key: {
                            document_key: 'd9e453033d2242c98e497bcc25ed9772'
                            variable: '787a9b535320220002c6435723dc3455'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '1985b20fa1dd41478556bf0e984ce870'
                        key: {
                            document_key: '56cb47a144f740c685109a7d7830b572'
                            variable: 'b124164e53a0220002c6435723dc34c5'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '1989b6f53ffd4d55910bc8166e945da7'
                        key: {
                            id: 'c65cd9f3659e4d0fbf689c24713b060c'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
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
                        table: 'sys_variable_value'
                        id: '19a060ae8b324bce8a7dd397b54d3c62'
                        key: {
                            document_key: 'e0808b26b3ed469b8855920d9d9cca11'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '19f5de633d4346e69068c40ebc65d3f3'
                        key: {
                            document_key: 'a0152d37cbf34736b3987a85e9b8598f'
                            variable: '1778a7480f20101091d0f00c97767e03'
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
                        table: 'sys_variable_value'
                        id: '1a8793f76ce949899ad6fb0eb729f88a'
                        key: {
                            document_key: '655c837c0f0d4fae853da3c00561200b'
                            variable: '17d732a9c7a333005e5c45b881c26007'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '1b5d70f306e0437c977c328e5f2bd4cf'
                        key: {
                            document_key: '73216deb3c174feb87f64bcfaaeef22a'
                            variable: '334ea2f153212110248dddeeff7b1255'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '1bbd07636969465ca4d9f2415d90d030'
                        key: {
                            document_key: '168034dbfea64f38b53f7f2ea92f9c34'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '1bc9931ad9bd4c8daab75cee573c286c'
                        key: {
                            id: 'd9fc1efe99d045a090d223a22f5c843a'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
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
                        table: 'sys_element_mapping'
                        id: '1c913f3b43c042ada052aa6ca1ec2328'
                        key: {
                            id: '8b52a2d012b5494593182dbd597a36ef'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '1c97246619764eae890330e224bc6f20'
                        key: {
                            document_key: '8726abd43d61408d95d18916f6fccf0e'
                            variable: '74d6e7a0a3023110571967d1361e616b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '1cadec8c4c0c4f39bcc2c5008b40c858'
                        key: {
                            document_key: '27c26f8cdc93457184f7a72cd62550d8'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '1cb7127f62df46fbb09c051fadb6ed87'
                        key: {
                            document_key: 'fcfbccdf42494429b1d91567a940cc54'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '1cc2868dd9194d158a36fb38a9b0d295'
                        key: {
                            document_key: '75827398f5854d5bb92c546cb38b1548'
                            variable: '787a9b535320220002c6435723dc3455'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '1d222a89504847eba2062ef73cfdcb8a'
                        key: {
                            id: '782e05882eb6457ca0a502b843bad30c'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '1d2467fc6dd041ea9ed23a7d807e9cc2'
                        key: {
                            document_key: '655c837c0f0d4fae853da3c00561200b'
                            variable: 'c2eb56e853422110248dddeeff7b1261'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '1d8b8819a71e4368b7f9b205eb5e5294'
                        key: {
                            document_key: '171fb967fc8b49cca3b4918187587750'
                            variable: '535cb5ab53233300f06fddeeff7b1247'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '1d8d79adbb0e47cc817b97d908cf3545'
                        key: {
                            document_key: '6d8f24eebfaa43219b2f4cd1c89309f3'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '1df88ce69e14408ab7403fd419169342'
                        key: {
                            document_key: 'f5f464a5b54541299f7b0132fec90fd9'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_atf_test_suite_test'
                        id: '1dfaad70551d4828ab954af6f637cb42'
                        key: {
                            test_suite: 'cf891548944e407ea4c3ce3b1c9439c0'
                            test: 'b36bb619745f4ac9982a573806a9b6c3'
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
                        table: 'sys_variable_value'
                        id: '1e39e6e3f6ce4f02a231e791f3076410'
                        key: {
                            document_key: '5c970e4e2ab4462b9dcba5364355ce14'
                            variable: '586e2c4253e0220002c6435723dc3415'
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
                        table: 'sys_variable_value'
                        id: '1f4caefc69744e76b755a5f3c7bc8377'
                        key: {
                            document_key: 'd3f488da65c1484baf2f672038c78591'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '1f8b9147cf324570bf076a5317d57e9f'
                        key: {
                            document_key: '57ce27e1c17b44d388be33fae8b1ed95'
                            variable: '989d9e235324220002c6435723dc3484'
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
                        table: 'sys_variable_value'
                        id: '1fe72245a9e04b808bce717d85a7082b'
                        key: {
                            document_key: '4e57a62f87324a96984ca46b04ad34fd'
                            variable: 'c2eb56e853422110248dddeeff7b1261'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '201e9ad5c64a4565894c2b22e9ec05a8'
                        key: {
                            document_key: 'a450d30d60a44f5a9ec7a33e6a7d4921'
                            variable: '9024a37f671003007ba405225685efe5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2056593a6e434bfbb5414b00bd9e6fd4'
                        key: {
                            document_key: '54bf29b8508e4213b68774b6361c4b98'
                            variable: 'cbddfa135320220002c6435723dc3415'
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
                        table: 'sys_variable_value'
                        id: '20d1d4aeeca14da3b73bf70e9a77dc74'
                        key: {
                            document_key: 'f3b8fa2209434b83b118221a7cb129d6'
                            variable: '535cb5ab53233300f06fddeeff7b1247'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '20d442c22f2b43d79cb78eef90e7af51'
                        key: {
                            document_key: '615e9ef9554043e791ccd882a62f17ec'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2103499118bd4749b9432acf9357a972'
                        key: {
                            document_key: 'bd707daf07a347d0aef544627cdf88ae'
                            variable: 'e6e3c7535320220002c6435723dc3496'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '21169e62caf94eaea55fcccfb01f83fb'
                        key: {
                            document_key: 'd12162408e914b6599051d3c5bd9197b'
                            variable: '992489e20fe2330091d0f00c97767e25'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '212f3feea08546a398eb801f0fd84339'
                        key: {
                            name: 'x_711398_se_cert_acquisition'
                            element: 'certified_date'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '21312323229d40f1b397d2a2b795e5e8'
                        key: {
                            document_key: '0e8587e0111f4a0ca988939746138559'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2156a08e31544fb4b0a385ee7a604fa9'
                        key: {
                            document_key: 'd9e453033d2242c98e497bcc25ed9772'
                            variable: 'b1fefcde73633300b19898b8caf6a7af'
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
                        table: 'sys_variable_value'
                        id: '2249866c46174e0cb496d9bbcc09db9d'
                        key: {
                            document_key: 'fff44106874a4924a6a841fa3d2feff3'
                            variable: 'ad351a4e53a0220002c6435723dc34f0'
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
                        table: 'sys_variable_value'
                        id: '22b16ac9c8f4418db30961f58c2b7eb2'
                        key: {
                            document_key: 'dfcded0f9c5d4aaf8cfee79536f435c8'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '22ce0b447dd84394b4b7c47f3fb7e47d'
                        key: {
                            document_key: '84ba951e590b49d283de8f54974ca18f'
                            variable: 'ff6e125353a0220002c6435723dc3442'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '22f95e11b11e412b83a513d6e25e8e07'
                        deleted: false
                        key: {
                            document_key: 'd433429271304936b77817b21bb7d316'
                            variable: '80625552c3833300eaac11fe81d3aedc'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '23822759cd8849a98309bd166d3fa76d'
                        key: {
                            document_key: '915a214e5b4c4a9ea55088acecffe0ae'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '238268e5a85b4e72b4802f9b4fbf47e4'
                        key: {
                            document_key: 'a994165cead24f6cbccebd95d55cf250'
                            variable: '67400008676003007ba405225685efa4'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '23eac804603e419ca58f435925f34e19'
                        key: {
                            id: '7599e1a63ee445079291f2895e805e7f'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2481e78a9d00459193497b0c4da71fdb'
                        deleted: true
                        key: {
                            document_key: '2c4d7ad88912481e818995a91a043871'
                            variable: 'dd54cf535320220002c6435723dc34fd'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '24d55cee83ca447daa6086fc3d585b63'
                        key: {
                            document_key: 'ec5a6d890fce455d9df8d6f7f773b4d2'
                            variable: '56e6bee65320220002c6435723dc34b9'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '24dcc061fce940e9a69519623ef0f617'
                        key: {
                            id: '3b860fa66d974e7ca7fdc5dbf00521a9'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '24ff5af81e414ff0b305d8d959dced5b'
                        key: {
                            document_key: '4e57a62f87324a96984ca46b04ad34fd'
                            variable: '17d732a9c7a333005e5c45b881c26007'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '25353bd075044cd3b004ae7be0255527'
                        key: {
                            document_key: '8644bb45cdd64a3c83921eba8324ed20'
                            variable: 'ba62b4075320220002c6435723dc34b9'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '255ecc3190d74b1c89c9a18b81380b2c'
                        key: {
                            document_key: '2d8887a2b25b4dd4ad35bb02a8eec62a'
                            variable: '9024a37f671003007ba405225685efe5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '256cf07951904595b58da9412cc98455'
                        key: {
                            document_key: '7b6fe367394a46a89be952d86ee1fb0b'
                            variable: 'dd54cf535320220002c6435723dc34fd'
                        }
                    },
                    {
                        table: 'sys_atf_test_suite_test'
                        id: '259067083d084bb580c2063c6146eeac'
                        key: {
                            test_suite: 'cf891548944e407ea4c3ce3b1c9439c0'
                            test: 'a565f090eed24cc49e1dcb27f8d91e63'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '25a876743eeb4827a6b679936715c8f0'
                        key: {
                            document_key: '4bdc3abd8b764e55a26649881d6cdf89'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
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
                        table: 'sys_variable_value'
                        id: '26376ddcc4b84bfe877d63eb119d9248'
                        key: {
                            document_key: 'f9cf9d0b10db44ec96a29b237a1c128b'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '263e1df976604430a4ec966c80b9e942'
                        key: {
                            document_key: 'b5d7be1deef04aa8a78a0eb689c9d285'
                            variable: '56e6bee65320220002c6435723dc34b9'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '264825dfbee84c7886bdb63e49e143b1'
                        key: {
                            document_key: '28b1f204578140aa8286fb4929bd4cda'
                            variable: '9024a37f671003007ba405225685efe5'
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
                        table: 'sys_element_mapping'
                        id: '274714d6c9734e5f8720c586acb5e3e0'
                        key: {
                            id: '040ab3ce99ea4041981375e1ea979dae'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
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
                        table: 'sys_variable_value'
                        id: '278b8d45148543b484f1699070db994e'
                        key: {
                            document_key: '6e1b44b3218b4278a06e0ba0951e87ec'
                            variable: '9024a37f671003007ba405225685efe5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '27fafca87ff148439f837aa442e6d862'
                        key: {
                            document_key: 'a09f35f327f7469cacb3152648f53480'
                            variable: '6e55da4e53a0220002c6435723dc34a0'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2810381b885a490695ce828337e816ec'
                        key: {
                            document_key: '915a214e5b4c4a9ea55088acecffe0ae'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2811fd3e648f454c959f8f9aee771a97'
                        deleted: true
                        key: {
                            document_key: '9fccfd3de1a94bfa83200051bf5196da'
                            variable: '9024a37f671003007ba405225685efe5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '28467ad619cc4206bb37dc023a5f80b8'
                        key: {
                            document_key: 'd9e453033d2242c98e497bcc25ed9772'
                            variable: 'e81ad3535320220002c6435723dc340c'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '286a093db2324298baa057f7259726b3'
                        key: {
                            document_key: 'a2aad9fc482741f59bd0e83beb4ccf8e'
                            variable: '0cd9df135320220002c6435723dc3426'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '28a620015cd9407f9395160479d761a3'
                        key: {
                            id: '400da504e54441ee824b20a2a9fc34c6'
                            table: 'var__m_atf_input_variable_1f39a288df60220062fe6c7a4df2639d'
                            field: 'record_id'
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
                        table: 'sys_variable_value'
                        id: '2961dfccbc734570b4fbcb024b486370'
                        key: {
                            document_key: '4f4dda8b82de4020b3e51be3f9c1a50b'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '29738bb74f994118abde1a88a880a247'
                        key: {
                            document_key: 'f8e3a00413d54bfc9eff8774283111e7'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2a0a692dded8494ba14478a2738756b7'
                        key: {
                            document_key: '8726abd43d61408d95d18916f6fccf0e'
                            variable: '6e55da4e53a0220002c6435723dc34a0'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2a362f459efc4ff4958de201b2c78672'
                        key: {
                            document_key: '662e98461a3347629bd5d439ccf493d3'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '2a456d33bf8f44b9a3bbb522ff28a33a'
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
                            element: 'certification_number'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2a73abe44ca348c19dcf0d9d5fbf85b6'
                        key: {
                            document_key: 'c65cd9f3659e4d0fbf689c24713b060c'
                            variable: '42f2564b73031300440211d8faf6a777'
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
                        table: 'sys_variable_value'
                        id: '2af88efbea5944f5a2b4a7369dab0985'
                        key: {
                            document_key: '168034dbfea64f38b53f7f2ea92f9c34'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2b22cfc75bec40fcb9c8f47d1a7e8872'
                        key: {
                            document_key: '7b3bc241dff54536a40ee7103eee110e'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2b558d52f8f5422aa6bfe9a1972caa50'
                        key: {
                            document_key: '6fb1e8e656394e298a12fb4cda569f4d'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2b8e6f038c1647daa061e9dd115f722e'
                        key: {
                            document_key: 'c24852e011814918872dd3807ceebfe1'
                            variable: '6e55da4e53a0220002c6435723dc34a0'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2bc5f36649094fc2b1c6585aac040c55'
                        key: {
                            document_key: 'd9e453033d2242c98e497bcc25ed9772'
                            variable: '6e5a1b535320220002c6435723dc3498'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2c0041e8be7747748cd9fbeabd7ab0aa'
                        key: {
                            document_key: 'fd9005862dd44a4a9b296c4bbdc6bbfd'
                            variable: '6e55da4e53a0220002c6435723dc34a0'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2c7a3152efef4f4eb58907e073436c9b'
                        key: {
                            document_key: '22445169193b4bae912717c011d7cbcf'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '2cc358b691e348d3aa77cd544aa732fc'
                        key: {
                            id: '5e4babd890c84729b3008c1348d9e816'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2ce629934b374285869eaeb9aacbe49e'
                        key: {
                            document_key: '773883304e0f43f6bfd03222dfb422d4'
                            variable: '56e6bee65320220002c6435723dc34b9'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2ceff131ed2143a7b16f22d55c686385'
                        key: {
                            document_key: '42e8e5e5c0e744209fdba2480846cab0'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2cf80675639e4ec399ee5881323b9da4'
                        deleted: true
                        key: {
                            document_key: '86ee740a27084e1b97bfa3f9507d0edc'
                            variable: '3d6d8b935320220002c6435723dc349c'
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
                        table: 'sys_variable_value'
                        id: '2d66104158fb4d9c888792e2dc9d640f'
                        key: {
                            document_key: '8d4b8d5b88f042c28a70a80eacf8e2f7'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2d7dcf7589334487afc8c8bf14104a36'
                        key: {
                            document_key: '85950516a5c54930a116b9638ddd8ebc'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2e3c544092ee4c25a345f2bf3c5bcb41'
                        key: {
                            document_key: 'bd707daf07a347d0aef544627cdf88ae'
                            variable: 'dd54cf535320220002c6435723dc34fd'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2e6d12a3b8c9482496438652cace3e3f'
                        key: {
                            document_key: 'bb69ffede2194bbfa88112a641d95f5a'
                            variable: '6e55da4e53a0220002c6435723dc34a0'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2eae6e281e8d4026bc806f2d3290e1e9'
                        key: {
                            document_key: 'fff44106874a4924a6a841fa3d2feff3'
                            variable: 'b124164e53a0220002c6435723dc34c5'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '2ece306df458469d9b91062a47e7a1d8'
                        key: {
                            id: '64de3ca6b60347809651c402ac992d3d'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '2ee45e632b5d4efcad70f15620d442cf'
                        key: {
                            id: 'ea409ed4745440b997e378011c7a81f8'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2ef3d1cd46464afb8981bf19b7a2f018'
                        key: {
                            document_key: '4851b270723641b292a30403051208eb'
                            variable: 'cbddfa135320220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2efb07f7040845be95dbe75d507e9c6e'
                        key: {
                            document_key: '99955528292244bab411b7ef63b9c678'
                            variable: '3eee292353e0220002c6435723dc343c'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2f28e030db434147a29caddd8bed4696'
                        key: {
                            document_key: '171fb967fc8b49cca3b4918187587750'
                            variable: '3eee292353e0220002c6435723dc343c'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '2f3be6ec6d7846d291060adcfe279a47'
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
                            element: 'skill.description'
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
                        table: 'sys_variable_value'
                        id: '2f4c943800734e7faf717222b50be1a7'
                        key: {
                            document_key: 'ed727cedd73c4860a3b040aacfe7a76c'
                            variable: '946f3c1a0f23330072e6452bc4767eda'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '2f630babfd6444b992d92aa4c18898df'
                        key: {
                            id: 'ae0eb0ce05044fcd8cc89655aa1826c1'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2f94cce7efc34a11995085b52ce59776'
                        key: {
                            document_key: 'dd11f82270e141dc82df0d437f73f962'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2fb2b2c2d5124bbbbd7a02b3a0f65221'
                        key: {
                            document_key: 'a176a145baa643c08089101a393b0d6c'
                            variable: '9024a37f671003007ba405225685efe5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2fd188653569430597023d48b651953b'
                        key: {
                            document_key: 'e6438ba894ff4c0dbfc238889a3d3c11'
                            variable: 'b1fefcde73633300b19898b8caf6a7af'
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
                        table: 'sys_element_mapping'
                        id: '3066b530e8a746c7af9b81ddb0aa4741'
                        key: {
                            id: '5ef9071c5553420fa675cb6efbb817f1'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '30dde7c105534fcaba94a69bc32ec0cf'
                        key: {
                            id: '2a215b036450427a8208abfd658ca8b3'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '310f8a75a02747d9b0a20622de2aeac7'
                        key: {
                            id: '1f8cddf7453540a882f5c4ee4a3ae7a4'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
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
                        table: 'sys_variable_value'
                        id: '318556d80e0b4153a7625c8b1bdc0ab3'
                        key: {
                            document_key: 'f58cb2b8878a4634a793ef63c0fce5b6'
                            variable: '90144b535320220002c6435723dc3488'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '31e474cdcf3f4df9a7f216833d2cce8f'
                        key: {
                            document_key: '22445169193b4bae912717c011d7cbcf'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '31fad9b24b5f4b4fa55132a552275b8b'
                        key: {
                            document_key: '225812b4762d4044a52833999203336e'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '32a66fe54ef245838a04daf26a6e6451'
                        deleted: false
                        key: {
                            document_key: '67b0fd4ff34847b683370acc6d780c6f'
                            variable: '80625552c3833300eaac11fe81d3aedc'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '337142dd7b0744a0bf99a8aad2d71a7b'
                        key: {
                            document_key: '6a59045bbe5f489091846d05e1c05c74'
                            variable: 'ae8b91c9ffa333008d3f5d9ad53bf1ba'
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
                        table: 'sys_variable_value'
                        id: '33ac767460a64949a062cf2461a3e553'
                        key: {
                            document_key: 'e6438ba894ff4c0dbfc238889a3d3c11'
                            variable: 'e63a97535320220002c6435723dc34b8'
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
                        table: 'sys_variable_value'
                        id: '349ddb22d4004ce3b1dac0df898ef380'
                        key: {
                            document_key: '662e98461a3347629bd5d439ccf493d3'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '34cd069785524eb79e42325220499d2e'
                        key: {
                            id: '6d8f24eebfaa43219b2f4cd1c89309f3'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '350879bc859c46f1a4d12d5c17865f5c'
                        key: {
                            document_key: 'f9cf9d0b10db44ec96a29b237a1c128b'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
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
                        table: 'sys_variable_value'
                        id: '3521e4ce0a75451eba94b30974bb19b5'
                        key: {
                            document_key: '8cf561ab50f54508903badc6d5c3fcb1'
                            variable: 'b124164e53a0220002c6435723dc34c5'
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
                        table: 'sys_variable_value'
                        id: '3584346ebcf9482e818623fced8e9b65'
                        key: {
                            document_key: '7599e1a63ee445079291f2895e805e7f'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '35bdd59c3823463fa7c532fc747f3899'
                        deleted: true
                        key: {
                            document_key: 'e17e99d05e564f57bb3e7c11742eda68'
                            variable: 'b1fefcde73633300b19898b8caf6a7af'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '368d5cfed5e34ea5859fde4ecde1d625'
                        key: {
                            id: 'bbdfc3bc18e643c7b04d320887fc056c'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '36a30676a0dc4d1797731f0acb3a8189'
                        key: {
                            id: '9ac08e2b56a648998eeb3d255102ff51'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
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
                        table: 'sys_variable_value'
                        id: '36e1c5f70f7d4dddbec0e6c6ba46048f'
                        key: {
                            document_key: 'cd37f24ffe0c47cb81a4a2d13089367a'
                            variable: '17d732a9c7a333005e5c45b881c26007'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '36ec0a48bd3048368452f3fbf938e2e8'
                        key: {
                            document_key: '97e4944c61aa4c91a902eb7e411d15b3'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '3739c090d42444ebb183a947859d4478'
                        key: {
                            document_key: '8914a6fbc1d340e1b5f5123307474703'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
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
                        deleted: true
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
                        table: 'sys_variable_value'
                        id: '37bceacaf44047cbbb6d8d4d66c75aba'
                        key: {
                            document_key: 'f88fa74df53141449796a295d0144d7c'
                            variable: '820ec4e93735030064a52f3c8e41f1a4'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '37f832dca4844a01a7734d730a81320e'
                        key: {
                            document_key: '4e43ae129706448bbe18817cbfc56280'
                            variable: '9024a37f671003007ba405225685efe5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '380cb2734bbe4bdea3850afe741c5fc4'
                        key: {
                            document_key: '52b6bfaba6d949f6ad87c88c06b4c06c'
                            variable: 'bc43e004c76733005e5c45b881c26046'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '382fc08904a1428da832c516fc65326a'
                        key: {
                            document_key: 'a3edc54fa9984ef4866b10642b77e2ca'
                            variable: '989d9e235324220002c6435723dc3484'
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
                        table: 'sys_variable_value'
                        id: '390498663be94b4b9ada35c231b31e35'
                        key: {
                            document_key: '4f3642ec1add414a9b5a9dc499ae8c24'
                            variable: '9024a37f671003007ba405225685efe5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '391530b22bc34ac5b9598633948ecaa2'
                        key: {
                            document_key: '168034dbfea64f38b53f7f2ea92f9c34'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
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
                        table: 'sys_variable_value'
                        id: '39310f20b5d3410d8f440590d77198c9'
                        key: {
                            document_key: '8d2f1cb6d719488ebe12eb643955de90'
                            variable: '334ea2f153212110248dddeeff7b1255'
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
                        table: 'sys_variable_value'
                        id: '39ae69f869bd4b409cfa71cbdeb5c71e'
                        key: {
                            document_key: '42e0e16a8cec445bb5652db8ff3e5d2a'
                            variable: '56e6bee65320220002c6435723dc34b9'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '39dfb11905df4ec991cc7e118c938776'
                        key: {
                            document_key: '90a63a077b9f43b489d5c1a5437dc7c0'
                            variable: '787a9b535320220002c6435723dc3455'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '39f97491cff34e38a8e4393e43074b0b'
                        key: {
                            id: '5da9b69fe3234f3b8257a33fec75e6b3'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '3a696722416544d4b69ac1a6e21673e2'
                        key: {
                            id: '43e26ea894564c55ae25ad21c883b3f8'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '3aa66f2001fe4799ae2b8f98129f1b1d'
                        key: {
                            document_key: '4f3642ec1add414a9b5a9dc499ae8c24'
                            variable: 'dd54cf535320220002c6435723dc34fd'
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
                        table: 'sys_variable_value'
                        id: '3acd6bf90fa642c599b83c29f58d7680'
                        key: {
                            document_key: '4a83d92b6d01494ba6461eff1c6cfea7'
                            variable: 'ff6e125353a0220002c6435723dc3442'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '3b0a2e64d86e4621a5c9dacc806bd981'
                        key: {
                            document_key: 'a77e723c483148e9bc32bc04575cb21a'
                            variable: '9024a37f671003007ba405225685efe5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '3b14f8a8c56d4fab867b3a6d595e6db7'
                        key: {
                            document_key: 'cfd418da608b430cb783b7da1836ca4d'
                            variable: '42f2564b73031300440211d8faf6a777'
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
                        table: 'sys_variable_value'
                        id: '3b4e98bc79014c5ea110fa55f7a3ace7'
                        key: {
                            document_key: 'bb69ffede2194bbfa88112a641d95f5a'
                            variable: '17d732a9c7a333005e5c45b881c26007'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '3b5bf3822bab4f33b1d6bde0d898fd25'
                        key: {
                            document_key: 'bc8dcab2be944a9cb5b8d755411b9f7e'
                            variable: '90144b535320220002c6435723dc3488'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '3b83d82d73df44938f9d08a4e0b7d3a2'
                        key: {
                            document_key: '6fb1e8e656394e298a12fb4cda569f4d'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '3b8d6e7f8e0e4d02ad8c430587c60c4f'
                        key: {
                            document_key: '4a83d92b6d01494ba6461eff1c6cfea7'
                            variable: 'cbddfa135320220002c6435723dc3415'
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
                        table: 'sys_variable_value'
                        id: '3be6b0c26ee24f9a9c1fb09352b67614'
                        key: {
                            document_key: '6d2b5496d96b456893271d788ce29481'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '3c0ac8c6539b4e6799b538204b4184a0'
                        key: {
                            document_key: 'dfcded0f9c5d4aaf8cfee79536f435c8'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
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
                        table: 'sys_variable_value'
                        id: '3c1ef33309d94eb0b14a97280762c886'
                        key: {
                            document_key: 'bd707daf07a347d0aef544627cdf88ae'
                            variable: '90144b535320220002c6435723dc3488'
                        }
                    },
                    {
                        table: 'sys_ui_action_role'
                        id: '3c485fb29f6343809498d65f2171ac85'
                        key: {
                            sys_ui_action: 'f8eea6a97daa46debc62052537a6fbc8'
                            sys_user_role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '3cbab67580aa428bbf7dd01f09d36d06'
                        deleted: true
                        key: {
                            document_key: 'dfd1c8d6fedf4466967ff9bbb5ad5d98'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '3cc1d9e0b39147eeb2d701aff049c6dd'
                        deleted: true
                        key: {
                            id: '1184c2b8f0bb4ad891388ffbb01233b4'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '3cfc1b1c24eb42ef8e76322dff2608ef'
                        deleted: true
                        key: {
                            document_key: '9fccfd3de1a94bfa83200051bf5196da'
                            variable: 'e6e3c7535320220002c6435723dc3496'
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
                        table: 'sys_variable_value'
                        id: '3d27b7fe4a114c6fa13c570c11bd502c'
                        key: {
                            document_key: '42e0e16a8cec445bb5652db8ff3e5d2a'
                            variable: 'ba62b4075320220002c6435723dc34b9'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '3d595a6dcccd4f0a9cf0b876592f23e0'
                        key: {
                            document_key: 'f3b8fa2209434b83b118221a7cb129d6'
                            variable: '7600f16353e0220002c6435723dc34d5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '3d7853bb35ac479aabb8021a9f86b019'
                        key: {
                            document_key: 'a176a145baa643c08089101a393b0d6c'
                            variable: '90144b535320220002c6435723dc3488'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '3dd453c01edf4171bb849a33bb3c4993'
                        key: {
                            document_key: 'c145f1f940934d9185bb1a7c09a9a34b'
                            variable: 'b124164e53a0220002c6435723dc34c5'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '3dd48c9ca0fa4051acfcfa258800b406'
                        deleted: false
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
                        table: 'sys_index'
                        id: '3e014338ff8a4fa38da2d6ae52b3cb69'
                        key: {
                            logical_table_name: 'x_711398_se_certificate'
                            col_name_string: 'product_line,name'
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
                        table: 'sys_variable_value'
                        id: '3e1cfc857e1843ddb5beec4f0fbfc912'
                        key: {
                            document_key: '6556f1186d8440b88d5268ab2936026d'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '3f25b2b83e134417b2da0404d356e280'
                        key: {
                            id: 'fd9005862dd44a4a9b296c4bbdc6bbfd'
                            table: 'var__m_atf_input_variable_5f2e0e535332120028bc29cac2dc34d3'
                            field: 'record_id'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '3f48b5189d054948b9312a5f6e659408'
                        key: {
                            document_key: 'c8870d98b2df41f8a0a831b914402528'
                            variable: 'ae1a857ddb5f3300f2410f95ca96191f'
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
                        table: 'sys_variable_value'
                        id: '3fbe58df580e42f4a7a41cf73cf0e7fe'
                        key: {
                            document_key: '7f3d2a47803740abaf4a6a5e4c2dd858'
                            variable: '6619c7aa5320220002c6435723dc34e2'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '3fdd263c94a24aaf9f47e0d4c85ed793'
                        key: {
                            document_key: '773883304e0f43f6bfd03222dfb422d4'
                            variable: '6619c7aa5320220002c6435723dc34e2'
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
                        table: 'sys_variable_value'
                        id: '406f2f0fe98542558eefae0a8694e8d1'
                        key: {
                            document_key: 'dd11f82270e141dc82df0d437f73f962'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '40ab7ce716c24be49a83e76ee89470a8'
                        key: {
                            document_key: '915a214e5b4c4a9ea55088acecffe0ae'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '40be9dcc459648c58bc72b1afa213a97'
                        deleted: true
                        key: {
                            document_key: 'e1d384b8c17743a48255388cf9effbb4'
                            variable: 'bc43e004c76733005e5c45b881c26046'
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
                        table: 'sys_variable_value'
                        id: '4188379904554f2384fe9db3b5275070'
                        deleted: true
                        key: {
                            document_key: '169f34052c8a40e0adc8813c8d763a0c'
                            variable: 'dd54cf535320220002c6435723dc34fd'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '41a5b4944f414be2bc339c4527c66fa2'
                        key: {
                            document_key: 'b5d7be1deef04aa8a78a0eb689c9d285'
                            variable: 'bc43e004c76733005e5c45b881c26046'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '41b06df246c94c94aebcd0d5c359c301'
                        key: {
                            document_key: 'cd37f24ffe0c47cb81a4a2d13089367a'
                            variable: '6e55da4e53a0220002c6435723dc34a0'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '41da11cfc74b4655a0de9dd6cc794deb'
                        key: {
                            document_key: 'c2fb91d8c3244a3bba5b9862f2f96474'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '42471b53451547079590899af8138090'
                        key: {
                            document_key: '8644bb45cdd64a3c83921eba8324ed20'
                            variable: '56e6bee65320220002c6435723dc34b9'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '42b124bd7c79483f88a25ee85013a1d0'
                        key: {
                            document_key: '85950516a5c54930a116b9638ddd8ebc'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '42bee7a7d6754ba4bb3c1482d89b2b08'
                        key: {
                            document_key: 'ea409ed4745440b997e378011c7a81f8'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '433596fa56f2426c9774fb252320fa23'
                        key: {
                            document_key: 'a0152d37cbf34736b3987a85e9b8598f'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '4371ba3a571244be8ef5c4b88c6661a1'
                        key: {
                            document_key: '28b1f204578140aa8286fb4929bd4cda'
                            variable: '90144b535320220002c6435723dc3488'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '43cf6489d7194ed6b6073b3199ffc394'
                        key: {
                            document_key: '4bdc3abd8b764e55a26649881d6cdf89'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '43ec5ded7435441ea3d5b79f79ac39b2'
                        key: {
                            document_key: '662e98461a3347629bd5d439ccf493d3'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '4452bbf9ce5d4f9299ff3cb17e755d05'
                        deleted: true
                        key: {
                            document_key: 'e17e99d05e564f57bb3e7c11742eda68'
                            variable: '592a17535320220002c6435723dc34d7'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '4484e858e0d348fc89a17c9f4cdc1463'
                        key: {
                            document_key: '8d2f1cb6d719488ebe12eb643955de90'
                            variable: '535cb5ab53233300f06fddeeff7b1247'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '44994b8d39964047b29c9df9369356b1'
                        deleted: true
                        key: {
                            document_key: '8768140509b348ca8571948df8fc0e6a'
                            variable: '6619c7aa5320220002c6435723dc34e2'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '44997e188d16432b99fb909ef5f4bee0'
                        key: {
                            document_key: 'a2a1d61feef3415b93e8bbd2053f8c1e'
                            variable: '42f2564b73031300440211d8faf6a777'
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
                        table: 'sys_element_mapping'
                        id: '44aa7be4c3b841b8a2295659f09c9980'
                        key: {
                            id: 'd78b2beddcf544d78d0b9883c4dbf7d2'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '44c0eca69ce74196b7c99438cb83c0ee'
                        deleted: true
                        key: {
                            document_key: '09bc792283ce48c2a845bbf55813f2e8'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '44c2a7639f204e04be09b8cf60cfcc15'
                        key: {
                            document_key: '8726abd43d61408d95d18916f6fccf0e'
                            variable: 'ad351a4e53a0220002c6435723dc34f0'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '44d16e04a451430bbe4b6975e1855552'
                        key: {
                            document_key: '400da504e54441ee824b20a2a9fc34c6'
                            variable: '6aad5a575360220002c6435723dc34b0'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '450b1d3581c94349822a5866485f8a3e'
                        key: {
                            document_key: '9ac08e2b56a648998eeb3d255102ff51'
                            variable: '586e2c4253e0220002c6435723dc3415'
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
                        table: 'sys_variable_value'
                        id: '45ebe031bbff4ce384c628ef4211481c'
                        deleted: true
                        key: {
                            document_key: '86ee740a27084e1b97bfa3f9507d0edc'
                            variable: 'c7e483f3671003007ba405225685effb'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '461d7fed6727418893a7a005fbd2c1c3'
                        deleted: true
                        key: {
                            document_key: 'e17e99d05e564f57bb3e7c11742eda68'
                            variable: 'e81ad3535320220002c6435723dc340c'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '4688ec02cf01473cb4ed2247df535fdd'
                        key: {
                            document_key: 'dfcded0f9c5d4aaf8cfee79536f435c8'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
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
                        table: 'sys_variable_value'
                        id: '46db39e1933c4c8abf150540846b67af'
                        deleted: false
                        key: {
                            document_key: 'd433429271304936b77817b21bb7d316'
                            variable: '7d821952c3833300eaac11fe81d3ae2e'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '46fc3203cf3c4f6c9f55075fc2def68e'
                        key: {
                            document_key: 'd19ed67160ec483987246740163e8a2e'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '4715552a60534351b886ffc5e66a7f93'
                        key: {
                            logical_table_name: 'x_711398_se_product_line'
                            col_name_string: 'name'
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
                        table: 'sys_variable_value'
                        id: '47b5228fdf67412e97b5d49a3ccdd540'
                        deleted: true
                        key: {
                            document_key: '2ce08f1880f748a4837cca6febc3b82f'
                            variable: '3a662f60a3023110571967d1361e6134'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '47cd553193fa4844bc9008fb7a65140d'
                        key: {
                            document_key: 'c24852e011814918872dd3807ceebfe1'
                            variable: 'c2eb56e853422110248dddeeff7b1261'
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
                        table: 'sys_variable_value'
                        id: '48fa1a327d134429a1730c1faa14ec0f'
                        key: {
                            document_key: '6c46b4ffca2b47279efb1ca27cbaf306'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '4929cec5c10043ef9f473c282e2cd666'
                        deleted: true
                        key: {
                            document_key: '2c4d7ad88912481e818995a91a043871'
                            variable: 'e6e3c7535320220002c6435723dc3496'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '493d00817ac4450581c5c330e7a0a87c'
                        deleted: true
                        key: {
                            document_key: 'bf1e21d6e4cf46d2a784d5102fefdaa3'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '4962ae1005f74720b811ca032f431398'
                        key: {
                            id: 'c439986ae33245c1b27b871689d3126b'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '49720b3f272f4c4789755deeffca2f3e'
                        key: {
                            document_key: 'fff44106874a4924a6a841fa3d2feff3'
                            variable: '6e55da4e53a0220002c6435723dc34a0'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '4a03c108ec5a400588f247d6280bb6eb'
                        key: {
                            document_key: '1dd8456248db44909763e1a86c8674a7'
                            variable: 'b124164e53a0220002c6435723dc34c5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '4a0e85b552c84f99ab0af71bab6d434b'
                        key: {
                            document_key: 'a0152d37cbf34736b3987a85e9b8598f'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
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
                        table: 'sys_variable_value'
                        id: '4a5b2d8d499a4fb9853360e53adc9a5c'
                        key: {
                            document_key: '60c2df0431524f6e89b42035a72c267c'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '4aba4f004c494817b2868ccb6204f12a'
                        key: {
                            id: '60c2df0431524f6e89b42035a72c267c'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
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
                        table: 'sys_element_mapping'
                        id: '4c202aedcacd4851bec506974469a0d1'
                        key: {
                            id: 'fff44106874a4924a6a841fa3d2feff3'
                            table: 'var__m_atf_input_variable_5f2e0e535332120028bc29cac2dc34d3'
                            field: 'record_id'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '4c335a2021c24f76a917aeffa58e229b'
                        key: {
                            document_key: 'd12162408e914b6599051d3c5bd9197b'
                            variable: 'e4650d260fe2330091d0f00c97767ec9'
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
                        table: 'sys_documentation'
                        id: '4cded1bfb22f41b4866d8201558c02b0'
                        key: {
                            name: 'x_711398_se_cert_acquisition'
                            element: 'certified_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '4ce47212861744ff9b1d0ab19b0cdb32'
                        key: {
                            document_key: '4bdc3abd8b764e55a26649881d6cdf89'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '4d0cc730656d4db48887ec1ed928b161'
                        key: {
                            document_key: '84ba951e590b49d283de8f54974ca18f'
                            variable: '6aad5a575360220002c6435723dc34b0'
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
                        table: 'sys_variable_value'
                        id: '4d6cd166c867477599bb5b6f0226f9a9'
                        key: {
                            document_key: '6fb1e8e656394e298a12fb4cda569f4d'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '4da946d90d3644c69356648e47476df7'
                        key: {
                            id: '9ae0ce72b558408f9b7be9608b572c8c'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '4dcc1327bbe6485e8997a5b1c8b6e81f'
                        deleted: true
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
                        table: 'sys_element_mapping'
                        id: '4de3757caef34c4092941e9fb9590098'
                        key: {
                            id: '0e349ef379294be58ba46b649b613ae5'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '4ebfc0f652e64f55afcbe089e991e273'
                        key: {
                            document_key: 'c8870d98b2df41f8a0a831b914402528'
                            variable: '992489e20fe2330091d0f00c97767e25'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '4f5fd78dbc734f7b802b74199aed99a3'
                        key: {
                            id: 'c2fb91d8c3244a3bba5b9862f2f96474'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '4fb272a96f65461fbfd067b8ecc6829f'
                        key: {
                            document_key: '2c5d9925b63541b4a9b043330f789427'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
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
                        table: 'sys_variable_value'
                        id: '4fcd6544f2fd46958d6d96c2cedcf1a3'
                        deleted: true
                        key: {
                            document_key: 'e17e99d05e564f57bb3e7c11742eda68'
                            variable: '787a9b535320220002c6435723dc3455'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '4fda922c5a444cf2b55b4d37eac327bf'
                        deleted: true
                        key: {
                            document_key: '887eb04225c94d869cc42fe269f1effa'
                            variable: '9024a37f671003007ba405225685efe5'
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
                        table: 'sys_documentation'
                        id: '4fe9b2d515054d4c97847de337e9ac9d'
                        key: {
                            name: 'x_711398_se_certificates_staging'
                            element: 'u_certificate'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '502fe0c82f224f6aa02ab5e1dd74881b'
                        key: {
                            document_key: '5dfaf6217ef444bd994cc88bf30749eb'
                            variable: '586e2c4253e0220002c6435723dc3415'
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
                        table: 'sys_variable_value'
                        id: '504d049722034e62bd88256d6a59a19c'
                        key: {
                            document_key: '7cc30954a2b843cfa84fa736208f0d03'
                            variable: '56e6bee65320220002c6435723dc34b9'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '505aff0e89764e11b152fd745b78ebdf'
                        key: {
                            document_key: 'b36e8431383f4c9daa22f46264cf6564'
                            variable: '6f2a59a4e7133300b5646ea8c2f6a975'
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
                        table: 'sys_variable_value'
                        id: '50ab85c4bded4afa92aade97ced5fa5b'
                        key: {
                            document_key: 'c65cd9f3659e4d0fbf689c24713b060c'
                            variable: '989d9e235324220002c6435723dc3484'
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
                        table: 'sys_variable_value'
                        id: '510edb9546984c939ffcebfc49491d98'
                        key: {
                            document_key: '21b6a3f4018a44179179f67d3547b907'
                            variable: '9024a37f671003007ba405225685efe5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '516bb812d4894625bec25342eee0dc5a'
                        key: {
                            document_key: '8960d14965984a64bc2a6247fd6fa6c2'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '517871aba4ce41f0ad83836c7d285269'
                        key: {
                            document_key: '915a214e5b4c4a9ea55088acecffe0ae'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '51a32d3d479e406d9eb9ad4c295c9e1c'
                        deleted: true
                        key: {
                            id: '2f020394fc814427a3ba809a9b4b8b1d'
                            table: 'var__m_atf_input_variable_5f2e0e535332120028bc29cac2dc34d3'
                            field: 'record_id'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '51c80ea2fb244aedaffdfaba14cf6715'
                        deleted: true
                        key: {
                            document_key: '7b9ba0441f3b4ff495a91edb7d8bde24'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '51ea2f80e2864b3abedbf4afc69c3dce'
                        key: {
                            document_key: 'c24852e011814918872dd3807ceebfe1'
                            variable: 'ad351a4e53a0220002c6435723dc34f0'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '52acaf077c7e4e6dbeb31a8edb684365'
                        key: {
                            document_key: 'a342d84aad2c4cbe95d54b1595268403'
                            variable: 'b124164e53a0220002c6435723dc34c5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '533dbba0ac5442f6bf4eadcd60568f8b'
                        key: {
                            document_key: 'f9cf9d0b10db44ec96a29b237a1c128b'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
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
                        table: 'sys_variable_value'
                        id: '53607b4cb46245859a744999fb86d4e9'
                        key: {
                            document_key: 'c40fc761e4324841a66feaa6206f5fa9'
                            variable: '1778a7480f20101091d0f00c97767e03'
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
                        table: 'sys_variable_value'
                        id: '53c1d772682a475da37b591d404ef699'
                        key: {
                            document_key: 'cd37f24ffe0c47cb81a4a2d13089367a'
                            variable: 'c2eb56e853422110248dddeeff7b1261'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '5461c3bad8894a5eabdfec3ba298b4f5'
                        deleted: true
                        key: {
                            document_key: 'e1d384b8c17743a48255388cf9effbb4'
                            variable: '56e6bee65320220002c6435723dc34b9'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '54857b23b4e949549f18b268b9eea2d0'
                        key: {
                            document_key: '21b6a3f4018a44179179f67d3547b907'
                            variable: 'e6e3c7535320220002c6435723dc3496'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '54d9a8f6505a41cbb5e3380a639f7d31'
                        key: {
                            name: 'x_711398_se_skills_staging'
                            element: 'u_skills'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '54e7ef8d831d43ef8237c03b25b93210'
                        key: {
                            document_key: 'a176a145baa643c08089101a393b0d6c'
                            variable: 'dd54cf535320220002c6435723dc34fd'
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
                        table: 'sys_variable_value'
                        id: '55031da4335a4c3790bdfab077afa4dd'
                        key: {
                            document_key: '662e98461a3347629bd5d439ccf493d3'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
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
                        table: 'sys_variable_value'
                        id: '5588945c91304d479f267321afc826c8'
                        key: {
                            document_key: 'c24852e011814918872dd3807ceebfe1'
                            variable: '17d732a9c7a333005e5c45b881c26007'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '558a10fb43d34fa983a39445e1b3c36a'
                        key: {
                            document_key: 'b36e8431383f4c9daa22f46264cf6564'
                            variable: 'bb84ed825320220002c6435723dc3400'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '558a1b48006f42fbba19f9ff2d16ce0a'
                        key: {
                            document_key: 'bb69ffede2194bbfa88112a641d95f5a'
                            variable: 'c2eb56e853422110248dddeeff7b1261'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '55c5f88f16c44a74a01806da412fd571'
                        deleted: true
                        key: {
                            id: '9fccfd3de1a94bfa83200051bf5196da'
                            table: 'var__m_atf_input_variable_14872288df60220062fe6c7a4df26319'
                            field: 'field_values'
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
                        table: 'sys_variable_value'
                        id: '55da0d5d42f34fa7a445840bb771ffcc'
                        key: {
                            document_key: '3d8cf9b8d11445f991e3e34ec6412e6a'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_transform_entry'
                        id: '55e36f60153740c5ae8a7b6163633341'
                        key: {
                            map: 'f4c3556260e34271adcf3d9a80d22527'
                            target_field: 'weight'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '5629a784b11c429ebe49f268d6e5f57f'
                        deleted: true
                        key: {
                            document_key: '9fccfd3de1a94bfa83200051bf5196da'
                            variable: '90144b535320220002c6435723dc3488'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '563c39b3012947e3bec76cfa80ac01d1'
                        key: {
                            name: 'x_711398_se_certificates_staging'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '5644d16e20a2490e8b929c824a6b5db3'
                        key: {
                            document_key: '8726abd43d61408d95d18916f6fccf0e'
                            variable: '17d732a9c7a333005e5c45b881c26007'
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
                        table: 'sys_variable_value'
                        id: '56e7d4a30f1347a6b0855280e7f9b6a9'
                        key: {
                            document_key: '4e43ae129706448bbe18817cbfc56280'
                            variable: '90144b535320220002c6435723dc3488'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '57064aef239f4fc89bf431a7e356e172'
                        deleted: true
                        key: {
                            document_key: '169f34052c8a40e0adc8813c8d763a0c'
                            variable: '90144b535320220002c6435723dc3488'
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
                        table: 'sys_variable_value'
                        id: '573190df6be04d38aa569b7297a8e1b2'
                        key: {
                            document_key: '225812b4762d4044a52833999203336e'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
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
                        table: 'sys_atf_test_suite_test'
                        id: '57a337235d1d4d2ca43e48864790bf33'
                        key: {
                            test_suite: 'cf891548944e407ea4c3ce3b1c9439c0'
                            test: '73c4b87499734eb4b4d1b966fef33e5f'
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
                        table: 'sys_variable_value'
                        id: '581fb35acbb14ee4a4cbb0c113e51741'
                        key: {
                            document_key: '85950516a5c54930a116b9638ddd8ebc'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
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
                        table: 'sys_variable_value'
                        id: '585ab10ed1e04e2789559dc77bc6a339'
                        key: {
                            document_key: '349981c3cfd140b89c69f71f77d55f82'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '58a1b977dc234c1cb9d787419bc54732'
                        key: {
                            document_key: '21b6a3f4018a44179179f67d3547b907'
                            variable: '90144b535320220002c6435723dc3488'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '59c4bafba7514808a213905dc29105ef'
                        deleted: true
                        key: {
                            document_key: '2ce08f1880f748a4837cca6febc3b82f'
                            variable: '6f2a59a4e7133300b5646ea8c2f6a975'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '5a066ecd95584aafaa5167ab1da271d8'
                        key: {
                            document_key: 'a2aad9fc482741f59bd0e83beb4ccf8e'
                            variable: '6e5a1b535320220002c6435723dc3498'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '5a226c91d1fc46aba94b4f30e1a83e46'
                        key: {
                            document_key: '02986b402a8f48a98aac864eb26fd040'
                            variable: '586e2c4253e0220002c6435723dc3415'
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
                        table: 'sys_variable_value'
                        id: '5ab5019252c642f2bef17ee779edef61'
                        key: {
                            document_key: 'd9e453033d2242c98e497bcc25ed9772'
                            variable: 'e63a97535320220002c6435723dc34b8'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '5ac6069f4470453aaa49a84b1176bb51'
                        key: {
                            document_key: 'dfcded0f9c5d4aaf8cfee79536f435c8'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '5ae75e6d00264d42b2e06d0f9b35e68d'
                        key: {
                            document_key: '4f4dda8b82de4020b3e51be3f9c1a50b'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '5b6d49067f174176924f2b3259f2dbbd'
                        key: {
                            document_key: '8d4b8d5b88f042c28a70a80eacf8e2f7'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '5babd4f8d5724e6db771f2bc02501a97'
                        key: {
                            document_key: '662e98461a3347629bd5d439ccf493d3'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '5babe9f723a44ea7a108b686b421300e'
                        deleted: true
                        key: {
                            document_key: '389f46abde1c4bc79d92f92e526ea607'
                            variable: '90144b535320220002c6435723dc3488'
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
                        table: 'sys_variable_value'
                        id: '5c4c6461ad7a460d90da93f6ed3f1a28'
                        deleted: true
                        key: {
                            document_key: '2ce08f1880f748a4837cca6febc3b82f'
                            variable: '27d4e1c25320220002c6435723dc3486'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '5c685bc88f9945958b11f28a81d91c8d'
                        key: {
                            document_key: 'dbc5ba1362624ff09d20b607539ca1cf'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '5c7cfb3e72f6464bae12eba6424d8432'
                        key: {
                            document_key: '7f3d2a47803740abaf4a6a5e4c2dd858'
                            variable: 'bc43e004c76733005e5c45b881c26046'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '5cdfc34e9e2e4411ac7da87b8977286c'
                        key: {
                            document_key: '7cc30954a2b843cfa84fa736208f0d03'
                            variable: 'ba62b4075320220002c6435723dc34b9'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '5ce906418ca24fcba1e90dae65404232'
                        key: {
                            document_key: '171fb967fc8b49cca3b4918187587750'
                            variable: '7600f16353e0220002c6435723dc34d5'
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
                        table: 'sys_variable_value'
                        id: '5d46995eb77f430ba0897671d9cb62ea'
                        key: {
                            document_key: 'a994165cead24f6cbccebd95d55cf250'
                            variable: 'ff6e125353a0220002c6435723dc3442'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '5da09b4c180a4c008fb1f09257740675'
                        key: {
                            document_key: '75827398f5854d5bb92c546cb38b1548'
                            variable: 'e81ad3535320220002c6435723dc340c'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5dc4a81ca59d457aa6d25320988108fc'
                        key: {
                            name: 'x_711398_se_skills_staging'
                            element: 'u_skills'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '5ddc1f0c4bd4415f9ebdb1700a4dddb9'
                        key: {
                            document_key: '349981c3cfd140b89c69f71f77d55f82'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '5e2467724d7d4df786b516147f3d8247'
                        key: {
                            document_key: 'a450d30d60a44f5a9ec7a33e6a7d4921'
                            variable: 'dd54cf535320220002c6435723dc34fd'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '5e509bc4060e4968b9701a894581c242'
                        key: {
                            document_key: '6556f1186d8440b88d5268ab2936026d'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '5ec36fd771ff45c6a59c082858ac2245'
                        key: {
                            id: 'a2a1d61feef3415b93e8bbd2053f8c1e'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '5ee364b6172a41fdb79a1dabf873a4fb'
                        key: {
                            id: '615e9ef9554043e791ccd882a62f17ec'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '5f238c56745c4978bf5855e5b2ebb46e'
                        key: {
                            document_key: '171fb967fc8b49cca3b4918187587750'
                            variable: '334ea2f153212110248dddeeff7b1255'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '5f3f76e4237d412ea779e88b247d65f5'
                        key: {
                            document_key: '6fb1e8e656394e298a12fb4cda569f4d'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '5f4d766930b64885a5d02f13fd51a0e0'
                        deleted: true
                        key: {
                            document_key: '887eb04225c94d869cc42fe269f1effa'
                            variable: 'dd54cf535320220002c6435723dc34fd'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '5fb3ced588d64e6284ea65346ee68e22'
                        key: {
                            document_key: 'dfd08723eccb4555b4b16d75a455ecf1'
                            variable: '7600f16353e0220002c6435723dc34d5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '5fc471fe36604999af1ed503fe38c879'
                        key: {
                            document_key: 'a09f35f327f7469cacb3152648f53480'
                            variable: 'ad351a4e53a0220002c6435723dc34f0'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '5fedcd7977204ce4a8c859567979d005'
                        deleted: true
                        key: {
                            document_key: 'bf1e21d6e4cf46d2a784d5102fefdaa3'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '6026e0db961a4031aa182be8cab841c0'
                        key: {
                            document_key: '7d7c937fb34443098c3a1d96d37b80e4'
                            variable: '9024a37f671003007ba405225685efe5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '602f76b00ded4f939278ee05acc99870'
                        key: {
                            document_key: '4ecb4a992cfe49aaa0ea14c36aba0fe7'
                            variable: 'bc43e004c76733005e5c45b881c26046'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '6032aeaf63e242ca9740df84f7cca121'
                        deleted: false
                        key: {
                            document_key: 'cd658824e728424eac213a133c660a85'
                            variable: '7d821952c3833300eaac11fe81d3ae2e'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '605cb6d9d7984333b18636f861f29032'
                        key: {
                            document_key: '662e98461a3347629bd5d439ccf493d3'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
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
                        table: 'sys_variable_value'
                        id: '60e6283c9bfe46e3917eeb3f0b9eebea'
                        key: {
                            document_key: '42e0e16a8cec445bb5652db8ff3e5d2a'
                            variable: 'bc43e004c76733005e5c45b881c26046'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '60f2964907fb484b87d49262c21e368b'
                        key: {
                            document_key: 'cde0b950810c409abfb51135235b3b22'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '612ed554d37844018c750a1e037ea314'
                        deleted: true
                        key: {
                            document_key: '8768140509b348ca8571948df8fc0e6a'
                            variable: 'ba62b4075320220002c6435723dc34b9'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '615b58dea630466fae53bb599c35eee6'
                        key: {
                            document_key: '424f75b4ffa944e88c82164d0d9a8e78'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '61777f26317f48f29020e0de8abbea02'
                        key: {
                            document_key: '8d4b8d5b88f042c28a70a80eacf8e2f7'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
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
                        table: 'sys_variable_value'
                        id: '61e20bb4d97a45d9942c9e62e43bf8e7'
                        key: {
                            document_key: '54bf29b8508e4213b68774b6361c4b98'
                            variable: '6aad5a575360220002c6435723dc34b0'
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
                        table: 'sys_variable_value'
                        id: '629fa1a1eb2a4303856d432bf414f26e'
                        key: {
                            document_key: 'c40fc761e4324841a66feaa6206f5fa9'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '62c6e690c2e349ad9f2025c9caba95f7'
                        key: {
                            document_key: 'f3b8fa2209434b83b118221a7cb129d6'
                            variable: '3eee292353e0220002c6435723dc343c'
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
                        table: 'sys_variable_value'
                        id: '643c01099b25432390225cde26689dd0'
                        key: {
                            document_key: '56cb47a144f740c685109a7d7830b572'
                            variable: '17d732a9c7a333005e5c45b881c26007'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '645bf1b2eb874e93956f126ced68948d'
                        key: {
                            name: 'x_711398_se_skills_staging'
                            element: 'u_product_line'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '64edba2ae959499f8b44ae1fabd0d1fb'
                        key: {
                            document_key: 'a677833bacd14280a2facdde9a3e56ba'
                            variable: '932d14a33756030064a52f3c8e41f120'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '654e758c661649aca0bc525b9e524011'
                        deleted: false
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
                        table: 'sys_variable_value'
                        id: '655d88b04a7d4ac5ad19c87b0957dba8'
                        key: {
                            document_key: '2c5d9925b63541b4a9b043330f789427'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
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
                        table: 'sys_variable_value'
                        id: '658271e1c4a0439aa6eca3ef795bdddb'
                        key: {
                            document_key: '426f25a0ea4841fe9344bd74d870872f'
                            variable: '42f2564b73031300440211d8faf6a777'
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
                        table: 'sys_variable_value'
                        id: '65cf516b5d9b4ec5985f49de49668c64'
                        deleted: true
                        key: {
                            document_key: '8768140509b348ca8571948df8fc0e6a'
                            variable: 'bc43e004c76733005e5c45b881c26046'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '65ef60e7e5b24267a68e8632b2b6f50f'
                        key: {
                            document_key: '263b2e9e951c44fbbf6613322c3e2af1'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '66c7bb13ec814b25b270089586cfeac5'
                        key: {
                            document_key: '1dd8456248db44909763e1a86c8674a7'
                            variable: 'c2eb56e853422110248dddeeff7b1261'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '66eb71f23b964cd9ad8567cabecac672'
                        deleted: true
                        key: {
                            document_key: '1184c2b8f0bb4ad891388ffbb01233b4'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '670aea5bacb8498f880c0ca90f0e23bd'
                        key: {
                            document_key: '49b221c11e0645b8b1902b8c07dc8b56'
                            variable: '6619c7aa5320220002c6435723dc34e2'
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
                        table: 'sys_variable_value'
                        id: '6748fee7073849f1b0e64926dd31ae6c'
                        key: {
                            document_key: '7b6fe367394a46a89be952d86ee1fb0b'
                            variable: '9024a37f671003007ba405225685efe5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '677c11a4c379440b988b4efa88e60c3e'
                        key: {
                            document_key: '991ec0ae3429451680c81eac0d702a37'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '677eece0ca4d4df2b8456e6aca598c35'
                        key: {
                            document_key: '2c5d9925b63541b4a9b043330f789427'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '67c8f402a5db4d26a3e9b3ddf90ad01b'
                        key: {
                            document_key: '4e43ae129706448bbe18817cbfc56280'
                            variable: 'dd54cf535320220002c6435723dc34fd'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '6878bb4ebac744ad98321b642391c478'
                        key: {
                            document_key: 'f58cb2b8878a4634a793ef63c0fce5b6'
                            variable: '9024a37f671003007ba405225685efe5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '68ac77661a8d4ac5a45fb155ed0c9bcf'
                        key: {
                            document_key: '5e467dde917240a9859a9861332b2452'
                            variable: '424ca6465320220002c6435723dc34b5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '6970f28cbd8049c18dc75853f601456c'
                        key: {
                            document_key: '6fb1e8e656394e298a12fb4cda569f4d'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
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
                        table: 'sys_element_mapping'
                        id: '69e91a69153148b29f9dbb19e2e344c5'
                        key: {
                            id: 'dbc9587c7e3042ac80593815c32bf452'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
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
                        table: 'sys_atf_test_suite_test'
                        id: '6a82ba14ccc7427cb09b084a6a844779'
                        key: {
                            test_suite: 'cf891548944e407ea4c3ce3b1c9439c0'
                            test: '8092469099ad43939436fabb190c87fb'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '6accb091f9814b2692ce33ab4beff016'
                        key: {
                            document_key: 'a677833bacd14280a2facdde9a3e56ba'
                            variable: '4a3319d73702030064a52f3c8e41f1a9'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '6adb5344876145a1a1cfad264d0a1ea0'
                        key: {
                            document_key: '8cf561ab50f54508903badc6d5c3fcb1'
                            variable: '6e55da4e53a0220002c6435723dc34a0'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '6add150ce9274a95bb033edf79b01922'
                        key: {
                            id: 'c145f1f940934d9185bb1a7c09a9a34b'
                            table: 'var__m_atf_input_variable_5f2e0e535332120028bc29cac2dc34d3'
                            field: 'record_id'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '6b65592b25a142c6818acbfcf02e10cc'
                        key: {
                            document_key: '8d2f1cb6d719488ebe12eb643955de90'
                            variable: '7600f16353e0220002c6435723dc34d5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '6b9abdec34b3475cbb6a0a3b130f04cf'
                        key: {
                            document_key: 'fdd3dc71e1a649b78d1d97e70267632a'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '6c2d1607e57946ae8aa612298cff7d62'
                        key: {
                            document_key: '334ef5062bec4175affb7c2144d63385'
                            variable: 'cbddfa135320220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '6cc7eeb753504beb8c9c16461595c23d'
                        key: {
                            id: '8b5782a176064e7391b0f217fc3548a4'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '6cf5423f2f1b424593ee384fabfa5b7c'
                        key: {
                            document_key: 'ae0eb0ce05044fcd8cc89655aa1826c1'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '6d10fc62402f4500bc5f77e5759705fb'
                        key: {
                            document_key: '334ef5062bec4175affb7c2144d63385'
                            variable: '67400008676003007ba405225685efa4'
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
                        table: 'sys_variable_value'
                        id: '6d65583f65a24322b0bb07e48de83f72'
                        key: {
                            document_key: '75827398f5854d5bb92c546cb38b1548'
                            variable: '0cd9df135320220002c6435723dc3426'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '6dd736c324f94158b0273494b7edaf1c'
                        key: {
                            document_key: '75827398f5854d5bb92c546cb38b1548'
                            variable: '592a17535320220002c6435723dc34d7'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '6dd849ce659b4606bc288b2a79852ab9'
                        key: {
                            document_key: '7fb217a124294c68bb160e659dce2cc0'
                            variable: 'e6e3c7535320220002c6435723dc3496'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '6e2af582170a4a809f952d2d12e622a5'
                        key: {
                            id: 'f5f464a5b54541299f7b0132fec90fd9'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
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
                        table: 'sys_variable_value'
                        id: '6eac574b761a4223ac918f8360461b15'
                        key: {
                            document_key: 'dbc9587c7e3042ac80593815c32bf452'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '6ebbc5fdcc5d49ff96249e12a4b06efe'
                        key: {
                            document_key: 'dc00065433214dab90427eb8e81f5437'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '6ec88ab22a9e4000a5618e3cc9a909df'
                        key: {
                            document_key: '6e1b44b3218b4278a06e0ba0951e87ec'
                            variable: 'dd54cf535320220002c6435723dc34fd'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '6f2cdd41b5fc41c8b9c58ba2e8c39751'
                        key: {
                            document_key: 'eff2f1b7d2f14099a28583fe2156a699'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '6f40f0065e014f059ff74d8627ee7cc6'
                        key: {
                            document_key: 'f3c2176f5fc943608bfd84b54245da6e'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '6f6c81dbb5274e52bc5cbe2ea8082c4b'
                        key: {
                            document_key: '75827398f5854d5bb92c546cb38b1548'
                            variable: 'b1fefcde73633300b19898b8caf6a7af'
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
                        table: 'sys_variable_value'
                        id: '6ffce1cdf40e4021abf7057bbc416d5c'
                        key: {
                            document_key: '7599e1a63ee445079291f2895e805e7f'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '702c6fc992fe418c92fcd0f7737434dd'
                        key: {
                            document_key: 'dc00065433214dab90427eb8e81f5437'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '707e635249c348e7b749c3f251eb5f3f'
                        key: {
                            document_key: '2d8887a2b25b4dd4ad35bb02a8eec62a'
                            variable: 'dd54cf535320220002c6435723dc34fd'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '70889b25edb0487e9166751a8e419a41'
                        key: {
                            document_key: '2d8887a2b25b4dd4ad35bb02a8eec62a'
                            variable: 'e6e3c7535320220002c6435723dc3496'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '70cf3e92854f40cb8b0cb03687eb78dc'
                        key: {
                            id: 'f3c2176f5fc943608bfd84b54245da6e'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '71353e9a978747d28da3ebfcc135fa01'
                        deleted: true
                        key: {
                            id: '09bc792283ce48c2a845bbf55813f2e8'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '7137db28fac3481f8c5132fa85981f89'
                        key: {
                            id: '3066a90f162c4cab953ac361ea61e38b'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '71724584498a42178f6289c3e0b535f9'
                        key: {
                            document_key: '7d7c937fb34443098c3a1d96d37b80e4'
                            variable: 'dd54cf535320220002c6435723dc34fd'
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
                        table: 'sys_variable_value'
                        id: '71bc97ffb3914711a3fe614d1c464815'
                        key: {
                            document_key: '85950516a5c54930a116b9638ddd8ebc'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '720db0d43bc74dfa96a4179fea50bc26'
                        deleted: false
                        key: {
                            field: 'script'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            id: '8c828e0824a6473192b72f271996f5f2'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '72cb51cea32f4837bd4aad1717a0ebeb'
                        key: {
                            name: 'x_711398_se_skills_staging'
                            element: 'u_product_line'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7328a39eb91e4ad5be96d1e0f726159d'
                        key: {
                            document_key: 'bbdfc3bc18e643c7b04d320887fc056c'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7363e79de1ee4768a727888cb437036d'
                        key: {
                            document_key: 'c80982f4c13743eaba03c8d19e94ffa5'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '736c83d3c8a34af29358534c5db00f13'
                        key: {
                            document_key: 'f5f464a5b54541299f7b0132fec90fd9'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7379498accf747d0920076ef6a618662'
                        key: {
                            document_key: 'a09f35f327f7469cacb3152648f53480'
                            variable: '74d6e7a0a3023110571967d1361e616b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '73881e4ceaf54edaac40b51d322812a4'
                        key: {
                            document_key: 'b019657a8b6f4f5ea7559d2f942348c0'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '7416880856f4417480c4778d12b27bcb'
                        key: {
                            id: '2de5998f7d5c4b0087be2ef4b5c4acf2'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
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
                        table: 'sys_variable_value'
                        id: '7491afde4c8c499594b4e2494e4ffd2c'
                        key: {
                            document_key: '6556f1186d8440b88d5268ab2936026d'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7524050ebb544652917dd0e601586894'
                        key: {
                            document_key: '915a214e5b4c4a9ea55088acecffe0ae'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '75d2ebbb53d1475f8d3d4b3fddeeb613'
                        key: {
                            document_key: '7fb217a124294c68bb160e659dce2cc0'
                            variable: 'dd54cf535320220002c6435723dc34fd'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '75e00024ba084ac48481ff3440724aad'
                        deleted: false
                        key: {
                            document_key: '67b0fd4ff34847b683370acc6d780c6f'
                            variable: '7d821952c3833300eaac11fe81d3ae2e'
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
                        table: 'sys_variable_value'
                        id: '763ec1ab651844ed84ea4930db547da0'
                        key: {
                            document_key: 'fd9005862dd44a4a9b296c4bbdc6bbfd'
                            variable: '17d732a9c7a333005e5c45b881c26007'
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
                        table: 'sys_variable_value'
                        id: '769cefad5ef449d4ad6d224f5375073e'
                        key: {
                            document_key: '6d8f24eebfaa43219b2f4cd1c89309f3'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '76c16149567443dd835912f1b84b5d78'
                        key: {
                            document_key: 'c145f1f940934d9185bb1a7c09a9a34b'
                            variable: '74d6e7a0a3023110571967d1361e616b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '76e181c16389408dab9de1146e2f4eb6'
                        key: {
                            document_key: '90a63a077b9f43b489d5c1a5437dc7c0'
                            variable: '80f953535320220002c6435723dc340f'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7717f136dc894855ae5c214530d9fcd4'
                        key: {
                            document_key: 'c439986ae33245c1b27b871689d3126b'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7747862538eb4c9eb784fca72695486b'
                        key: {
                            document_key: 'd19ed67160ec483987246740163e8a2e'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '774ad3b431914ca4ad2af30ffc41b2c8'
                        key: {
                            document_key: '42e8e5e5c0e744209fdba2480846cab0'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '7761e56c630444cbb305fc46f5707823'
                        key: {
                            id: '22470d70b95d4b57aa2030adc7735862'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7774161e7f3f4d2d9a98680e5fc43d39'
                        key: {
                            document_key: '4a83d92b6d01494ba6461eff1c6cfea7'
                            variable: '6aad5a575360220002c6435723dc34b0'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '7774f8df27b141eab5cc01944099facc'
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
                            position: '7'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '77977c09737b40cf94610ed94c6a9913'
                        key: {
                            document_key: '6fb1e8e656394e298a12fb4cda569f4d'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '77e4145ca2a54b36b128e64edabe1d95'
                        key: {
                            document_key: 'f8e3a00413d54bfc9eff8774283111e7'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
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
                        table: 'sys_variable_value'
                        id: '787004c6052b47aca2b0795936761cb1'
                        key: {
                            document_key: 'e0808b26b3ed469b8855920d9d9cca11'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '78a79e9b87df4f19b8f6d2baf72112f1'
                        key: {
                            document_key: '8914a6fbc1d340e1b5f5123307474703'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '78b5a84b232a4fb7b5b1e6bb15e0ae96'
                        key: {
                            document_key: '3b582d98689b45bc94596dd480072037'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '78b9846ac0194c03932190761c621e9f'
                        deleted: true
                        key: {
                            document_key: 'bf1e21d6e4cf46d2a784d5102fefdaa3'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
                        }
                    },
                    {
                        table: 'sys_transform_entry'
                        id: '790204f2b0564f4c8f3af4c52af349a9'
                        key: {
                            map: 'f4c3556260e34271adcf3d9a80d22527'
                            target_field: 'product_line'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '79136ff7243449f79d8f40abee6c8a0f'
                        key: {
                            document_key: 'e6438ba894ff4c0dbfc238889a3d3c11'
                            variable: '592a17535320220002c6435723dc34d7'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7947b939f90e44d191faefe47593a2c6'
                        key: {
                            document_key: 'c145f1f940934d9185bb1a7c09a9a34b'
                            variable: 'ad351a4e53a0220002c6435723dc34f0'
                        }
                    },
                    {
                        table: 'sys_atf_test_suite_test'
                        id: '799b026290ab44d7bacef4361964d927'
                        key: {
                            test_suite: 'cf891548944e407ea4c3ce3b1c9439c0'
                            test: '9c14ad875b1745e2a468365698996f3e'
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
                        table: 'sys_variable_value'
                        id: '7a3a19625b514e988946d31a369c5b88'
                        key: {
                            document_key: '7cc30954a2b843cfa84fa736208f0d03'
                            variable: '6619c7aa5320220002c6435723dc34e2'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7a79bffc0332471aa461538556051d23'
                        key: {
                            document_key: 'd12162408e914b6599051d3c5bd9197b'
                            variable: 'e664cde20fe2330091d0f00c97767e45'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7a8d7cbd28654583ae8f263075607dd8'
                        key: {
                            document_key: '2a215b036450427a8208abfd658ca8b3'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7aefab1b2a884bb7aa5d36aa4d6f1f0d'
                        key: {
                            document_key: '991ec0ae3429451680c81eac0d702a37'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
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
                        table: 'sys_atf_test_suite_test'
                        id: '7b050ba09e5a4e4fbd44ee01d70ee8f8'
                        key: {
                            test_suite: 'cf891548944e407ea4c3ce3b1c9439c0'
                            test: '9c06a18b251a4dd7b1e26200415a488a'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: '7b7f5517f4fe4564b93f57eedd683f95'
                        key: {
                            ui_policy: {
                                id: 'c90c558c3c614a60822cbd184cdd8d26'
                                key: {
                                    table: 'x_711398_se_submission'
                                    short_description: 'Lock Work notes when the Submission is Completed'
                                }
                            }
                            field: 'work_notes'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7ba3637500c34908992f8b910c319b89'
                        key: {
                            document_key: 'e6438ba894ff4c0dbfc238889a3d3c11'
                            variable: '6e5a1b535320220002c6435723dc3498'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7bb504a27fa048f499856b6cdd21ebb0'
                        key: {
                            document_key: 'dd11f82270e141dc82df0d437f73f962'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7bea6ee494cf493380ec4f57c71c000a'
                        key: {
                            document_key: '73216deb3c174feb87f64bcfaaeef22a'
                            variable: '7c5f6d2353e0220002c6435723dc34f6'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '7c58d72f6fa54bed8ff508d76dbb1b1c'
                        key: {
                            id: 'fcfbccdf42494429b1d91567a940cc54'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7cceb4d04687461c8ab6bc495857e79d'
                        key: {
                            document_key: '4f4dda8b82de4020b3e51be3f9c1a50b'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7cd21a6c4bac4eef8f464426ed9a704b'
                        key: {
                            document_key: 'd12162408e914b6599051d3c5bd9197b'
                            variable: '1cd3cda20fe2330091d0f00c97767e37'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7cd3f694bbab47f29a2ca446d4a4cf6b'
                        key: {
                            document_key: 'fff44106874a4924a6a841fa3d2feff3'
                            variable: 'c2eb56e853422110248dddeeff7b1261'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7cfb859bc7804a8a8608bef3e65c4af9'
                        key: {
                            document_key: '8b52a2d012b5494593182dbd597a36ef'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7d1d578bdfa64cd4bab7ce96c23d0bd6'
                        key: {
                            name: 'x_711398_se_cert_acquisition'
                            element: 'servicenow_release'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7d37fa65370347999fecb4483975124c'
                        key: {
                            document_key: '991ec0ae3429451680c81eac0d702a37'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7d65be0072a142a6bb757ea9cd87f97c'
                        key: {
                            document_key: '49b221c11e0645b8b1902b8c07dc8b56'
                            variable: '56e6bee65320220002c6435723dc34b9'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7d69e0f714f8493e9205758bdae928d3'
                        key: {
                            document_key: 'd9e453033d2242c98e497bcc25ed9772'
                            variable: '80f953535320220002c6435723dc340f'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '7d78de8c57404bbe9cfcf787c772d202'
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
                            element: 'servicenow_release'
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
                        table: 'sys_variable_value'
                        id: '7e5a39629c0942f98b4e8b3521ad7abd'
                        key: {
                            document_key: 'e6438ba894ff4c0dbfc238889a3d3c11'
                            variable: '787a9b535320220002c6435723dc3455'
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
                        table: 'sys_variable_value'
                        id: '7e6e4b83664448578cad5ceca29ccdd9'
                        key: {
                            document_key: '99955528292244bab411b7ef63b9c678'
                            variable: '7c5f6d2353e0220002c6435723dc34f6'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7e7a28c70dc04d09a869f9488834ca97'
                        deleted: false
                        key: {
                            document_key: '677ba1da2cad447b9555be912694a0cf'
                            variable: '80625552c3833300eaac11fe81d3aedc'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7e7d3110f49b4bfc8738777da3e5b188'
                        key: {
                            document_key: '424f75b4ffa944e88c82164d0d9a8e78'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
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
                        table: 'sys_variable_value'
                        id: '7eddfba6c13b4ede8f9e1a3df8192360'
                        deleted: true
                        key: {
                            document_key: '887eb04225c94d869cc42fe269f1effa'
                            variable: 'e6e3c7535320220002c6435723dc3496'
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
                        table: 'sys_variable_value'
                        id: '7efbeb67f200403383aae7b1f041bd0a'
                        key: {
                            document_key: '400da504e54441ee824b20a2a9fc34c6'
                            variable: '52ed1e5b5360220002c6435723dc3421'
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
                        table: 'sys_variable_value'
                        id: '7f5cac3e09af4b8cb3f45226f98988d9'
                        key: {
                            document_key: '2d8887a2b25b4dd4ad35bb02a8eec62a'
                            variable: '90144b535320220002c6435723dc3488'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '7fd74457e3fb44468ce9f6a1accd2974'
                        key: {
                            id: '774876baadcf498c8c19d40a9f8d3a46'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7ff3852261de42d4849a03fd89b0eb8e'
                        key: {
                            document_key: '4a83d92b6d01494ba6461eff1c6cfea7'
                            variable: '52ed1e5b5360220002c6435723dc3421'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '80190b3729c74dc194305c6f944798b7'
                        key: {
                            document_key: 'a09f35f327f7469cacb3152648f53480'
                            variable: 'b124164e53a0220002c6435723dc34c5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '803e002882e34f7f95de611cb2ac2dfa'
                        key: {
                            document_key: 'a0152d37cbf34736b3987a85e9b8598f'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
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
                        table: 'sys_variable_value'
                        id: '815e51d3079b4ed3b0e4a77f6e0723eb'
                        key: {
                            document_key: '91a59f7bc4ce4f7f84e7aa66e97da74d'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '8196a4bf86574e98892b2f7dc49705cc'
                        key: {
                            document_key: '84ba951e590b49d283de8f54974ca18f'
                            variable: 'cbddfa135320220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '81d62b7ef0584d39a96c0c644db98cf2'
                        key: {
                            document_key: '991ec0ae3429451680c81eac0d702a37'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '81e828b45b8a4e29842b6e1036556a08'
                        key: {
                            document_key: 'c145f1f940934d9185bb1a7c09a9a34b'
                            variable: '17d732a9c7a333005e5c45b881c26007'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '81ee3e631aa24e62b3ce9bf643bdd10f'
                        key: {
                            document_key: 'bc8dcab2be944a9cb5b8d755411b9f7e'
                            variable: 'e6e3c7535320220002c6435723dc3496'
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
                        table: 'sys_variable_value'
                        id: '824ef83f67c84a8f9c3d0fb2fcc93294'
                        key: {
                            document_key: '7b6fe367394a46a89be952d86ee1fb0b'
                            variable: 'e6e3c7535320220002c6435723dc3496'
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
                        table: 'sys_documentation'
                        id: '827c1134eaa74b7a8ae45693fb7d859f'
                        key: {
                            name: 'x_711398_se_certificates_staging'
                            element: 'NULL'
                            language: 'en'
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
                        table: 'sys_variable_value'
                        id: '82b8f9cc13404fa1aa54a97a27887cd9'
                        key: {
                            document_key: 'c8870d98b2df41f8a0a831b914402528'
                            variable: 'e664cde20fe2330091d0f00c97767e45'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '8340b398217545cc834842c407ebe162'
                        key: {
                            document_key: '991ec0ae3429451680c81eac0d702a37'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '8350f5aea7d04d91aec093378df97dda'
                        key: {
                            document_key: 'bb69ffede2194bbfa88112a641d95f5a'
                            variable: '74d6e7a0a3023110571967d1361e616b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '837ed9f2be8c4904b233928700a765f8'
                        key: {
                            document_key: 'a2aad9fc482741f59bd0e83beb4ccf8e'
                            variable: 'b1fefcde73633300b19898b8caf6a7af'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '83bf377c0f034ea6af7af4d1b5cdd7c2'
                        key: {
                            id: 'a3edc54fa9984ef4866b10642b77e2ca'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '8431d77cd5984c9f9ad911619e8e90fb'
                        key: {
                            document_key: '43e26ea894564c55ae25ad21c883b3f8'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '8432d4d7006d4f2c976d68615787b69f'
                        key: {
                            document_key: 'a77e723c483148e9bc32bc04575cb21a'
                            variable: '90144b535320220002c6435723dc3488'
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
                        table: 'sys_element_mapping'
                        id: '846f29093d4a45659db7da4f48a97c0f'
                        key: {
                            id: 'abb4ed390b3d470e9b67a29a95fa049f'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '84d5b7af79b2474ab2095143237e1985'
                        key: {
                            document_key: 'f9cf9d0b10db44ec96a29b237a1c128b'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
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
                        table: 'sys_variable_value'
                        id: '856de192201e47c48ac2e0c5b966c1a0'
                        key: {
                            document_key: 'fd9005862dd44a4a9b296c4bbdc6bbfd'
                            variable: 'b124164e53a0220002c6435723dc34c5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '857fd2ebc2b749bba12645ef83236b30'
                        key: {
                            document_key: '4f4dda8b82de4020b3e51be3f9c1a50b'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '859ad6974d66487a80dbd6dd0570044d'
                        key: {
                            document_key: 'd78b2beddcf544d78d0b9883c4dbf7d2'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '863516320ae2413495b5e7e3c711e187'
                        key: {
                            document_key: '773883304e0f43f6bfd03222dfb422d4'
                            variable: 'bc43e004c76733005e5c45b881c26046'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '869a00deae5942be95b16ac52181ed5d'
                        key: {
                            document_key: '400da504e54441ee824b20a2a9fc34c6'
                            variable: 'cbddfa135320220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '86cc697b59da4af3834c33539553ad1d'
                        key: {
                            document_key: 'f8e3a00413d54bfc9eff8774283111e7'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '877b81de63d54f1ab005eab59a319ba8'
                        key: {
                            document_key: '6556f1186d8440b88d5268ab2936026d'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
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
                        table: 'sys_variable_value'
                        id: '880a304368674f4296b8ce11d1ac1f7b'
                        deleted: true
                        key: {
                            document_key: 'eff2f1b7d2f14099a28583fe2156a699'
                            variable: '9024a37f671003007ba405225685efe5'
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
                        table: 'sys_variable_value'
                        id: '88877d926e7041ea931eb672a13d2177'
                        key: {
                            document_key: 'f9cf9d0b10db44ec96a29b237a1c128b'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '8911d298c9584adabf2a49dcea4b0963'
                        key: {
                            document_key: '782e05882eb6457ca0a502b843bad30c'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '89a7c3d776674391b1d90499e8e3b937'
                        key: {
                            name: 'x_711398_se_skills_staging'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '89ba31919d054715a5d88834f6b71364'
                        key: {
                            document_key: '662e98461a3347629bd5d439ccf493d3'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
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
                        table: 'sys_variable_value'
                        id: '8a0efef44b1e41879accc404a967985f'
                        deleted: true
                        key: {
                            document_key: '389f46abde1c4bc79d92f92e526ea607'
                            variable: 'dd54cf535320220002c6435723dc34fd'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '8a29a87167c14c15b70ca297e2f65e8b'
                        key: {
                            document_key: '2c5d9925b63541b4a9b043330f789427'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '8a8de3eb743747d58b6412e633228a1a'
                        key: {
                            document_key: '54bf29b8508e4213b68774b6361c4b98'
                            variable: '67400008676003007ba405225685efa4'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '8a95f3c78f1240ca9602352efa400b07'
                        deleted: true
                        key: {
                            id: '9f846652720f448697e475c516ba069b'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '8b3cd412c3324d3da9d4ff396ffe872c'
                        key: {
                            document_key: '225812b4762d4044a52833999203336e'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
                        }
                    },
                    {
                        table: 'sys_atf_test_suite_test'
                        id: '8b925a94705046debcd1ce1fc7b79763'
                        key: {
                            test_suite: 'cf891548944e407ea4c3ce3b1c9439c0'
                            test: '11d61a3293fb4caa875a2ae58b66202a'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '8c28f918224c420e8a1877b54fd182db'
                        key: {
                            document_key: '774876baadcf498c8c19d40a9f8d3a46'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '8c54cd8036034c61a7c98fe88daa825c'
                        key: {
                            id: '42e8e5e5c0e744209fdba2480846cab0'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
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
                        table: 'sys_variable_value'
                        id: '8cfce87334724982b3bf3aea0603dc88'
                        key: {
                            document_key: '646a68dc34de4c9cbed04e37099d6b4d'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8d54c433fa044d01b456a948a0624db3'
                        key: {
                            name: 'x_711398_se_cert_acquisition'
                            element: 'certification_number'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '8d55f703ff4f43d6a58b98e56a1815f7'
                        key: {
                            document_key: 'f58cb2b8878a4634a793ef63c0fce5b6'
                            variable: 'e6e3c7535320220002c6435723dc3496'
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
                        table: 'sys_variable_value'
                        id: '8e1d26fc2b1147d2bb73c425d28fc415'
                        key: {
                            document_key: '7f3d2a47803740abaf4a6a5e4c2dd858'
                            variable: '56e6bee65320220002c6435723dc34b9'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '8e3962be20ec4b099e54fa3a6e244549'
                        key: {
                            document_key: '90a63a077b9f43b489d5c1a5437dc7c0'
                            variable: '0cd9df135320220002c6435723dc3426'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '8eb37d1b5211404cb42090d7ed4d31a0'
                        deleted: true
                        key: {
                            document_key: 'e1d384b8c17743a48255388cf9effbb4'
                            variable: 'ba62b4075320220002c6435723dc34b9'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '8f26cdf19afc40c38814c6e295c644ec'
                        key: {
                            document_key: 'b5d7be1deef04aa8a78a0eb689c9d285'
                            variable: '6619c7aa5320220002c6435723dc34e2'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '8f34f1e189f248feb823023d6dc486e4'
                        key: {
                            document_key: 'c40fc761e4324841a66feaa6206f5fa9'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '8f35c4f5304348478ce364bc651cce08'
                        key: {
                            document_key: 'f3c2176f5fc943608bfd84b54245da6e'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '907b8be385564ce08a8b05fd150e8e95'
                        key: {
                            id: '57ce27e1c17b44d388be33fae8b1ed95'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '91589818929c421f962af1fe21a5e8ff'
                        key: {
                            document_key: 'd9fc1efe99d045a090d223a22f5c843a'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '918ff3a181c6498984d04114c884f02b'
                        key: {
                            document_key: 'd9e453033d2242c98e497bcc25ed9772'
                            variable: '0cd9df135320220002c6435723dc3426'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '919c4c795b2f47aab71ee692601cff90'
                        key: {
                            document_key: 'ec5a6d890fce455d9df8d6f7f773b4d2'
                            variable: 'ba62b4075320220002c6435723dc34b9'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '91c0a0260ee44e0fb6b3e8749487ca73'
                        key: {
                            document_key: '8726abd43d61408d95d18916f6fccf0e'
                            variable: 'c2eb56e853422110248dddeeff7b1261'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '91c2d8fa5f23451e99a1dd0b6ef38639'
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
                            element: 'servicenow_release'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '91cdc0a3397b4e49b9ff2fe2f4877e32'
                        key: {
                            id: '27c26f8cdc93457184f7a72cd62550d8'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '92861fedf09a4a669d260527466872db'
                        key: {
                            document_key: 'dd11f82270e141dc82df0d437f73f962'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '93215cd644574b3985748d1fbd797edf'
                        key: {
                            document_key: '22445169193b4bae912717c011d7cbcf'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '9323d77889a64723ab383ff946e4a9a6'
                        deleted: true
                        key: {
                            document_key: 'e17e99d05e564f57bb3e7c11742eda68'
                            variable: '0cd9df135320220002c6435723dc3426'
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
                        table: 'sys_variable_value'
                        id: '935b2fddbb984d8988894b1c1f617f69'
                        key: {
                            document_key: 'd12162408e914b6599051d3c5bd9197b'
                            variable: 'a78481260fe2330091d0f00c97767e7c'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '936442e8be6c423c9fd06e19033165c9'
                        key: {
                            document_key: '91a59f7bc4ce4f7f84e7aa66e97da74d'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '936e337c2dd048e1be8729ab5ffb6e08'
                        deleted: true
                        key: {
                            document_key: 'bf1e21d6e4cf46d2a784d5102fefdaa3'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '93b43b37f0df4a2d83c241f9802933be'
                        key: {
                            document_key: 'f8e3a00413d54bfc9eff8774283111e7'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '93d63a7934fe4fc58314fdb8c996652b'
                        key: {
                            document_key: '57ce27e1c17b44d388be33fae8b1ed95'
                            variable: '42f2564b73031300440211d8faf6a777'
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
                        table: 'sys_variable_value'
                        id: '941232b229ea4daa900dcdc98bd918a0'
                        key: {
                            document_key: '64de3ca6b60347809651c402ac992d3d'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '9477afd07969436a93291e203fb3ace4'
                        key: {
                            document_key: 'd3f488da65c1484baf2f672038c78591'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '9480641c20b94f71b2c63c25d608491c'
                        key: {
                            name: 'x_711398_se_skills_staging'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '94e22415f0e1463c9d2433d781488af5'
                        key: {
                            document_key: 'd3f488da65c1484baf2f672038c78591'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '94e268e3fe774ff0af7446f76b2dcf4d'
                        key: {
                            document_key: '0eb9d9b020514786af8960894abc5087'
                            variable: '8570e0e33756030064a52f3c8e41f16c'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '9502982ba0334a45a0053e6c1948362c'
                        key: {
                            document_key: 'a09f35f327f7469cacb3152648f53480'
                            variable: '17d732a9c7a333005e5c45b881c26007'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '950924fb55754fb0ab0211990ee28aa2'
                        deleted: true
                        key: {
                            document_key: 'e17e99d05e564f57bb3e7c11742eda68'
                            variable: '6e5a1b535320220002c6435723dc3498'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '9512440ef92d4b629d8bf612f8fa80c4'
                        key: {
                            document_key: 'a342d84aad2c4cbe95d54b1595268403'
                            variable: '74d6e7a0a3023110571967d1361e616b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '95773748f24d46a5b795b8ebe23550f1'
                        key: {
                            document_key: '171fb967fc8b49cca3b4918187587750'
                            variable: '7c5f6d2353e0220002c6435723dc34f6'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '95c8320952bc4f6d86c70baaebe17fa1'
                        deleted: true
                        key: {
                            document_key: 'bf1e21d6e4cf46d2a784d5102fefdaa3'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '96133ab997ed485a9a33059745c560ef'
                        key: {
                            document_key: '8644bb45cdd64a3c83921eba8324ed20'
                            variable: '6619c7aa5320220002c6435723dc34e2'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '961f1eeb720247f2bbc1c877143bfe17'
                        key: {
                            document_key: '90a63a077b9f43b489d5c1a5437dc7c0'
                            variable: '6e5a1b535320220002c6435723dc3498'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '9673996deb35424cbe3e7681203de777'
                        key: {
                            id: '3a6c0bf3c8604fcab96d5cc50040ab28'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '9678e45b76fb4cc5bb4340a74dc844ec'
                        key: {
                            document_key: '54bf29b8508e4213b68774b6361c4b98'
                            variable: '52ed1e5b5360220002c6435723dc3421'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '9716c0d3f4df403abe15e9f25fd3a042'
                        key: {
                            document_key: 'b019657a8b6f4f5ea7559d2f942348c0'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '972217c9644b4867b797ff7cc7c2eea9'
                        key: {
                            name: 'x_711398_se_cert_acquisition'
                            element: 'servicenow_release'
                            language: 'en'
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
                        table: 'sys_variable_value'
                        id: '977b1e2c988a42b7ba0ab33785f451f3'
                        key: {
                            document_key: '400da504e54441ee824b20a2a9fc34c6'
                            variable: 'ff6e125353a0220002c6435723dc3442'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '97da476f929745f684eb3628114ca26b'
                        deleted: true
                        key: {
                            document_key: '2f020394fc814427a3ba809a9b4b8b1d'
                            variable: '17d732a9c7a333005e5c45b881c26007'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '97e2324958ff45dbb7ade025b1f48c33'
                        key: {
                            document_key: '28b1f204578140aa8286fb4929bd4cda'
                            variable: 'e6e3c7535320220002c6435723dc3496'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '98020dea7f654d6bb379b98980424b8d'
                        key: {
                            document_key: '85950516a5c54930a116b9638ddd8ebc'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '98471584bb82452a8af9b96151f0932d'
                        key: {
                            document_key: 'dbc5ba1362624ff09d20b607539ca1cf'
                            variable: '42f2564b73031300440211d8faf6a777'
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
                        table: 'sys_variable_value'
                        id: '9960616fdfa749e99d0aca5fcf37365e'
                        deleted: true
                        key: {
                            document_key: '389f46abde1c4bc79d92f92e526ea607'
                            variable: 'e6e3c7535320220002c6435723dc3496'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '99b79f8396bb414da392a11090ff7f02'
                        key: {
                            document_key: '8d4b8d5b88f042c28a70a80eacf8e2f7'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
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
                        table: 'sys_variable_value'
                        id: '9a1d8db9e6114e3cb1d546f24e55dcab'
                        deleted: true
                        key: {
                            document_key: 'eff2f1b7d2f14099a28583fe2156a699'
                            variable: 'dd54cf535320220002c6435723dc34fd'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '9a39861ac865465a86ee1701a70ecd24'
                        deleted: false
                        key: {
                            document_key: '8c828e0824a6473192b72f271996f5f2'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '9a4c75934d304a979b4a8130e419c8ec'
                        key: {
                            document_key: '5da9b69fe3234f3b8257a33fec75e6b3'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '9a67a1b085894ba8bb56cc3135684bbe'
                        key: {
                            document_key: 'a994165cead24f6cbccebd95d55cf250'
                            variable: 'cbddfa135320220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '9a7646900c8749668edba22a783914cc'
                        deleted: true
                        key: {
                            document_key: 'eff2f1b7d2f14099a28583fe2156a699'
                            variable: '90144b535320220002c6435723dc3488'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '9aab8fbc56994ed1af4b5f81a7cf0d71'
                        key: {
                            document_key: '4e57a62f87324a96984ca46b04ad34fd'
                            variable: 'b124164e53a0220002c6435723dc34c5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '9accd19f1f904e6ba2a415b97ad147ac'
                        key: {
                            document_key: 'a342d84aad2c4cbe95d54b1595268403'
                            variable: 'ad351a4e53a0220002c6435723dc34f0'
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
                        table: 'sys_variable_value'
                        id: '9b15bc6bf7bc44058dfca40ff1ad59bc'
                        key: {
                            document_key: '2de5998f7d5c4b0087be2ef4b5c4acf2'
                            variable: '586e2c4253e0220002c6435723dc3415'
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
                        table: 'sys_variable_value'
                        id: '9ba7bd5281894bd183ca3c22d5644ef3'
                        key: {
                            document_key: 'f8e3a00413d54bfc9eff8774283111e7'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '9c03e283a7594e4c8d94610acf442be5'
                        key: {
                            document_key: 'eff2f1b7d2f14099a28583fe2156a699'
                            variable: '989d9e235324220002c6435723dc3484'
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
                        table: 'sys_variable_value'
                        id: '9c23d7ad84e44e2f8e8d7d6248353b19'
                        deleted: true
                        key: {
                            document_key: 'e1d384b8c17743a48255388cf9effbb4'
                            variable: '6619c7aa5320220002c6435723dc34e2'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '9c4eb75ed5bb432b98bb086cf8f173ce'
                        key: {
                            document_key: '8d2f1cb6d719488ebe12eb643955de90'
                            variable: '7c5f6d2353e0220002c6435723dc34f6'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '9c865122d2a34a6e9db93b26b405fce6'
                        key: {
                            document_key: '8c828e0824a6473192b72f271996f5f2'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '9d36b8f03d754f2b8659450166300170'
                        key: {
                            document_key: '90a63a077b9f43b489d5c1a5437dc7c0'
                            variable: '592a17535320220002c6435723dc34d7'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '9dc4b89c91fc46d1b73c59709d615eea'
                        deleted: true
                        key: {
                            document_key: 'e17e99d05e564f57bb3e7c11742eda68'
                            variable: 'e63a97535320220002c6435723dc34b8'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '9e4ee94f45be48e9b7585b4d5564665a'
                        key: {
                            document_key: '263b2e9e951c44fbbf6613322c3e2af1'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '9f485d5668ab496287af831d1ff51db2'
                        key: {
                            document_key: 'c8870d98b2df41f8a0a831b914402528'
                            variable: 'a78481260fe2330091d0f00c97767e7c'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '9f89c7754b7649bab6de13341d6658f2'
                        key: {
                            document_key: '8960d14965984a64bc2a6247fd6fa6c2'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'a0338d15696e4cf387d241b5817ec0bd'
                        key: {
                            id: 'a342d84aad2c4cbe95d54b1595268403'
                            table: 'var__m_atf_input_variable_5f2e0e535332120028bc29cac2dc34d3'
                            field: 'record_id'
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
                        table: 'sys_variable_value'
                        id: 'a084f7070f24469d9dda07fb1059e94e'
                        key: {
                            document_key: 'ec5a6d890fce455d9df8d6f7f773b4d2'
                            variable: 'bc43e004c76733005e5c45b881c26046'
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
                        table: 'sys_element_mapping'
                        id: 'a1096f01f31a4b3a87262b798024a275'
                        key: {
                            id: 'cde0b950810c409abfb51135235b3b22'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
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
                        table: 'sys_variable_value'
                        id: 'a117d23458a74fd399ba2e44541e59aa'
                        key: {
                            document_key: '263b2e9e951c44fbbf6613322c3e2af1'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a14f368791954aa9bc0a6d9d24c7be52'
                        key: {
                            document_key: 'fd9005862dd44a4a9b296c4bbdc6bbfd'
                            variable: 'c2eb56e853422110248dddeeff7b1261'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'a20126bc807d4a20ac9f6ed27eb84ddc'
                        key: {
                            id: 'a09f35f327f7469cacb3152648f53480'
                            table: 'var__m_atf_input_variable_5f2e0e535332120028bc29cac2dc34d3'
                            field: 'record_id'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'a24b4b9f79ab45e6adfa2cd0da044393'
                        key: {
                            id: 'e616877eabd148c08a2184a458957c19'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a2a5aa28fd1b40c7893a13a69d4b3702'
                        key: {
                            document_key: '263b2e9e951c44fbbf6613322c3e2af1'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a2b2a6ec111a4ef6bf3d1bbcba3b5de2'
                        key: {
                            document_key: '4e43ae129706448bbe18817cbfc56280'
                            variable: 'e6e3c7535320220002c6435723dc3496'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a2b3112b93754c8faa6f229b9d0dd3f9'
                        key: {
                            document_key: 'a2aad9fc482741f59bd0e83beb4ccf8e'
                            variable: 'e81ad3535320220002c6435723dc340c'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a2b3d0b42ea940f2bab754d88eeaa552'
                        key: {
                            document_key: '424f75b4ffa944e88c82164d0d9a8e78'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a35695734f554cbeb6eea058fb5a8bd2'
                        key: {
                            document_key: 'dfd08723eccb4555b4b16d75a455ecf1'
                            variable: '51547e3953212110248dddeeff7b126b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a378e8cf5fcd48f0a6d0c5233cfab74b'
                        key: {
                            document_key: '3066a90f162c4cab953ac361ea61e38b'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'a3fe2944020441e9bcdc2d54b254540a'
                        key: {
                            id: 'dbc5ba1362624ff09d20b607539ca1cf'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a40869b0243a4632a14213867fd92ac3'
                        key: {
                            document_key: '8726abd43d61408d95d18916f6fccf0e'
                            variable: 'b124164e53a0220002c6435723dc34c5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a41ecc1e35da4e998c5b993581c8bf44'
                        key: {
                            document_key: '2a215b036450427a8208abfd658ca8b3'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a41fb45db86948a6b4438c9b7ddbc55d'
                        key: {
                            document_key: 'bd707daf07a347d0aef544627cdf88ae'
                            variable: '9024a37f671003007ba405225685efe5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a45d17f7e4bb4bfba0765277f91349d1'
                        key: {
                            document_key: 'dd11f82270e141dc82df0d437f73f962'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a481bdf9338c48cb944dde3443489006'
                        key: {
                            document_key: '168034dbfea64f38b53f7f2ea92f9c34'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
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
                        table: 'sys_element_mapping'
                        id: 'a4f6e5681e6f4a94933af9dc25c5a23a'
                        key: {
                            id: '398665856caa48a5bb14dfe7dd6114b8'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a57287d0a8de4b198a1f0e655077588c'
                        key: {
                            document_key: '1dd8456248db44909763e1a86c8674a7'
                            variable: 'ad351a4e53a0220002c6435723dc34f0'
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
                        table: 'sys_variable_value'
                        id: 'a5e4c4d620144d2db2db25ed515dd067'
                        deleted: true
                        key: {
                            document_key: '2f020394fc814427a3ba809a9b4b8b1d'
                            variable: '6e55da4e53a0220002c6435723dc34a0'
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
                        table: 'sys_variable_value'
                        id: 'a672db9366d9450f8a26268c7e663c48'
                        key: {
                            document_key: '4f3642ec1add414a9b5a9dc499ae8c24'
                            variable: '90144b535320220002c6435723dc3488'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a7174107802a4bdaa335787f167888e4'
                        deleted: true
                        key: {
                            document_key: '2f020394fc814427a3ba809a9b4b8b1d'
                            variable: 'ad351a4e53a0220002c6435723dc34f0'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a7406a79ee5b41739ce0d12f9a24ed4d'
                        key: {
                            document_key: '3066a90f162c4cab953ac361ea61e38b'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'a7fb3717f4a6407abb52e2b19930c0b9'
                        key: {
                            id: '51dd19cbd40443e1af31799291225128'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
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
                        table: 'sys_variable_value'
                        id: 'a88fb98cbd1b4c188ac71330e86e5e22'
                        key: {
                            document_key: '8960d14965984a64bc2a6247fd6fa6c2'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'a8a38609e5eb487abd286d5f9dc38aae'
                        key: {
                            name: 'x_711398_se_certificates_staging'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a8cd0cdf9db8417fa4bb372974c075e1'
                        key: {
                            document_key: '1f8cddf7453540a882f5c4ee4a3ae7a4'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a904237a368b438ebc3fdecc0ceee54a'
                        key: {
                            document_key: 'a0152d37cbf34736b3987a85e9b8598f'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a90fe82e51b0445dba17525619bc64a7'
                        key: {
                            document_key: '8914a6fbc1d340e1b5f5123307474703'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a93913dea9e546f2ba60ead7a5774448'
                        key: {
                            document_key: '398665856caa48a5bb14dfe7dd6114b8'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a93bf844be5543a888138e42b7a033e7'
                        key: {
                            document_key: '43e26ea894564c55ae25ad21c883b3f8'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a953d58973b44be09f48c19f81443fb0'
                        key: {
                            document_key: 'c40fc761e4324841a66feaa6206f5fa9'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a96ab748a67544b088fc2446406631e8'
                        key: {
                            document_key: '4a83d92b6d01494ba6461eff1c6cfea7'
                            variable: '67400008676003007ba405225685efa4'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'a9798fd92cdd4dce995e89b11e3aa821'
                        key: {
                            id: 'c24852e011814918872dd3807ceebfe1'
                            table: 'var__m_atf_input_variable_5f2e0e535332120028bc29cac2dc34d3'
                            field: 'record_id'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a980cd5057224604ad96f9c65c4ddc47'
                        key: {
                            document_key: '56cb47a144f740c685109a7d7830b572'
                            variable: 'ad351a4e53a0220002c6435723dc34f0'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'a9987d5a379c4cdf8271e0b2de4dd400'
                        key: {
                            id: 'bb69ffede2194bbfa88112a641d95f5a'
                            table: 'var__m_atf_input_variable_5f2e0e535332120028bc29cac2dc34d3'
                            field: 'record_id'
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
                        table: 'sys_variable_value'
                        id: 'aab7ef9f1ebe4f249592bab1a405ec74'
                        key: {
                            document_key: '9ae0ce72b558408f9b7be9608b572c8c'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'aad5f43286d847de97646c087cae3c0e'
                        key: {
                            document_key: '5ef9071c5553420fa675cb6efbb817f1'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'aadbbc06fece4b258f5dbf71416df8cb'
                        key: {
                            name: 'x_711398_se_certificates_staging'
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
                        table: 'sys_variable_value'
                        id: 'abba04aad5f44efabfebff344d5c0db0'
                        deleted: false
                        key: {
                            document_key: '2bcf8f10463149809a7581d26e1b6859'
                            variable: '7d821952c3833300eaac11fe81d3ae2e'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'ac0c2c4a480047848b294b5c948c1aee'
                        key: {
                            document_key: '774876baadcf498c8c19d40a9f8d3a46'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'ac1886a8b5784b93be0a24ca505b1554'
                        key: {
                            document_key: '424f75b4ffa944e88c82164d0d9a8e78'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
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
                        table: 'sys_variable_value'
                        id: 'ac2c2ba71b8544d6a023c33c5af4a101'
                        key: {
                            document_key: 'bc8dcab2be944a9cb5b8d755411b9f7e'
                            variable: 'dd54cf535320220002c6435723dc34fd'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'ac96a8cb9ad844619cb73cc73de268b6'
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
                            element: 'certified_date'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'acc1c3ea52c24205a0034ee0879175e5'
                        deleted: true
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
                        table: 'sys_variable_value'
                        id: 'ad5f3f23512946aa9f1f47b7c8d3bbf5'
                        key: {
                            document_key: '75827398f5854d5bb92c546cb38b1548'
                            variable: '80f953535320220002c6435723dc340f'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'ad7acc6880fe4f529f5cb1efd2663407'
                        deleted: true
                        key: {
                            document_key: '8768140509b348ca8571948df8fc0e6a'
                            variable: '56e6bee65320220002c6435723dc34b9'
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
                        table: 'sys_variable_value'
                        id: 'ae36e403c14447629257656783c061ba'
                        key: {
                            document_key: '7fb217a124294c68bb160e659dce2cc0'
                            variable: '9024a37f671003007ba405225685efe5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'aeb4ee4b565245d89f417130891e66dd'
                        key: {
                            document_key: '7d7c937fb34443098c3a1d96d37b80e4'
                            variable: '90144b535320220002c6435723dc3488'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'af3aafa419bf464b8df871c6671037bb'
                        key: {
                            document_key: '90a63a077b9f43b489d5c1a5437dc7c0'
                            variable: 'e63a97535320220002c6435723dc34b8'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'af4bda834ec74dc1ba8165b67e2dfe0c'
                        deleted: true
                        key: {
                            document_key: 'bf1e21d6e4cf46d2a784d5102fefdaa3'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
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
                        table: 'sys_element_mapping'
                        id: 'afac680c8f43411eae56d8b14c294db3'
                        deleted: true
                        key: {
                            id: 'dfd1c8d6fedf4466967ff9bbb5ad5d98'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'afaef705407e4d4db516f6843a19d32c'
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
                            element: 'certification_number'
                            position: '2'
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
                        table: 'sys_variable_value'
                        id: 'b03c003f389e433eb62e4e03a1632292'
                        key: {
                            document_key: '6c46b4ffca2b47279efb1ca27cbaf306'
                            variable: '42f2564b73031300440211d8faf6a777'
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
                        table: 'sys_variable_value'
                        id: 'b0a6487c741942939d30b58a1e8e36c9'
                        key: {
                            document_key: '7cc30954a2b843cfa84fa736208f0d03'
                            variable: 'bc43e004c76733005e5c45b881c26046'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b0e8c11cab8740be96cfa1d0f15313ca'
                        key: {
                            document_key: '3d8cf9b8d11445f991e3e34ec6412e6a'
                            variable: '989d9e235324220002c6435723dc3484'
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
                        table: 'sys_variable_value'
                        id: 'b1a329b6536141c597f3327dc7cc92ce'
                        key: {
                            document_key: 'dfd08723eccb4555b4b16d75a455ecf1'
                            variable: '535cb5ab53233300f06fddeeff7b1247'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b1a73d51500b47eebea495cb0364597c'
                        key: {
                            document_key: '22445169193b4bae912717c011d7cbcf'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
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
                        table: 'sys_variable_value'
                        id: 'b1c88c4d956240fbb8f79e7b80b2bf54'
                        key: {
                            document_key: '52b6bfaba6d949f6ad87c88c06b4c06c'
                            variable: 'ba62b4075320220002c6435723dc34b9'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'b214287460a746fc88c7d61bc8216d9f'
                        deleted: true
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
                        table: 'sys_variable_value'
                        id: 'b2530ff1fec44868982e395846e2f4af'
                        key: {
                            document_key: 'a450d30d60a44f5a9ec7a33e6a7d4921'
                            variable: 'e6e3c7535320220002c6435723dc3496'
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
                        table: 'sys_variable_value'
                        id: 'b28e74fff9bd4245943da2b03de2b8ba'
                        key: {
                            document_key: '52b6bfaba6d949f6ad87c88c06b4c06c'
                            variable: '56e6bee65320220002c6435723dc34b9'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b2abc70c23274b8aba9cd80eef474f2b'
                        key: {
                            document_key: '99955528292244bab411b7ef63b9c678'
                            variable: '7600f16353e0220002c6435723dc34d5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b311cd10cfe944e38b74daa5c9a4e0e8'
                        key: {
                            document_key: 'd78b2beddcf544d78d0b9883c4dbf7d2'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b32e14e09bbe4f8e92d9f25d77753353'
                        key: {
                            document_key: 'f3b8fa2209434b83b118221a7cb129d6'
                            variable: '51547e3953212110248dddeeff7b126b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b330d0f87b23480f86836ddfc520edeb'
                        key: {
                            document_key: '6e1b44b3218b4278a06e0ba0951e87ec'
                            variable: 'e6e3c7535320220002c6435723dc3496'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b37aa7248c3b44a0ad26741d780f0339'
                        key: {
                            document_key: '2c5d9925b63541b4a9b043330f789427'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b389842e51584600a3a282d4705a0a1b'
                        key: {
                            document_key: 'd19ed67160ec483987246740163e8a2e'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
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
                        id: 'b3ae5cf444954ead9233e42d638192ff'
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
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b4108dbae7c043b0a85d4c0bae76a527'
                        key: {
                            document_key: '75827398f5854d5bb92c546cb38b1548'
                            variable: 'e63a97535320220002c6435723dc34b8'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b4a10c3f54f6450b8ee95c6e3178186a'
                        key: {
                            document_key: '539b8915aca04251a2b2b7d2ed966256'
                            variable: '6619c7aa5320220002c6435723dc34e2'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b4c2730e9f1c411795a786f324343831'
                        key: {
                            document_key: 'b36e8431383f4c9daa22f46264cf6564'
                            variable: '3a662f60a3023110571967d1361e6134'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'b4d4a19af1e64e4db03e98af5a724611'
                        key: {
                            id: '655c837c0f0d4fae853da3c00561200b'
                            table: 'var__m_atf_input_variable_5f2e0e535332120028bc29cac2dc34d3'
                            field: 'record_id'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b509971819d54b529b8d2e07f3204932'
                        key: {
                            document_key: 'fff44106874a4924a6a841fa3d2feff3'
                            variable: '74d6e7a0a3023110571967d1361e616b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b56bfd65bdf54208a4d26c90bc890e47'
                        key: {
                            document_key: 'b36e8431383f4c9daa22f46264cf6564'
                            variable: '27d4e1c25320220002c6435723dc3486'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b58f2d12f81148b29ed0d1d220c8a88f'
                        key: {
                            document_key: '52b6bfaba6d949f6ad87c88c06b4c06c'
                            variable: '6619c7aa5320220002c6435723dc34e2'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b592b946812342c39c511fcabfbd2c38'
                        key: {
                            document_key: '73216deb3c174feb87f64bcfaaeef22a'
                            variable: '535cb5ab53233300f06fddeeff7b1247'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b5a7a25a2dcc4e6aa91939e554912e4b'
                        key: {
                            document_key: '7f3d2a47803740abaf4a6a5e4c2dd858'
                            variable: 'ba62b4075320220002c6435723dc34b9'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b612fac76d304c748cb17e2dc51b27e6'
                        key: {
                            document_key: '3a6c0bf3c8604fcab96d5cc50040ab28'
                            variable: '586e2c4253e0220002c6435723dc3415'
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
                        table: 'sys_variable_value'
                        id: 'b68d687d6b5447e3a368823c31675bd0'
                        deleted: true
                        key: {
                            document_key: 'e17e99d05e564f57bb3e7c11742eda68'
                            variable: '80f953535320220002c6435723dc340f'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b6c849b058934c95adf058d532a25626'
                        key: {
                            document_key: 'a342d84aad2c4cbe95d54b1595268403'
                            variable: 'c2eb56e853422110248dddeeff7b1261'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b706a2eeec11417eae9f47231b577448'
                        key: {
                            document_key: 'ea409ed4745440b997e378011c7a81f8'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b7a7b80788cf4204aa9b04c3e64c3b19'
                        deleted: true
                        key: {
                            document_key: '7b9ba0441f3b4ff495a91edb7d8bde24'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b7a9de22719743d699529cc5e6347afa'
                        key: {
                            document_key: '655c837c0f0d4fae853da3c00561200b'
                            variable: 'ad351a4e53a0220002c6435723dc34f0'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b7b4536dc6464d55b3ac6e6516efaf9f'
                        key: {
                            document_key: 'dfd08723eccb4555b4b16d75a455ecf1'
                            variable: '334ea2f153212110248dddeeff7b1255'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b8664d98ef3c48a1a2d2fed18a686333'
                        key: {
                            document_key: 'ed727cedd73c4860a3b040aacfe7a76c'
                            variable: '424ca6465320220002c6435723dc34b5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b8e979cc80ca4b2c8721ed8c830bdd42'
                        key: {
                            document_key: 'a342d84aad2c4cbe95d54b1595268403'
                            variable: '17d732a9c7a333005e5c45b881c26007'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'b9402f31396b4f77b2574e6b90299592'
                        key: {
                            id: 'fdd3dc71e1a649b78d1d97e70267632a'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b962b1a2be194dffa336aab10b83d2ab'
                        key: {
                            document_key: '1f8cddf7453540a882f5c4ee4a3ae7a4'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b9e360cbce1e41eda3122f326669a28c'
                        key: {
                            document_key: '539b8915aca04251a2b2b7d2ed966256'
                            variable: 'ba62b4075320220002c6435723dc34b9'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b9e5fc904bd540adb67f713686983327'
                        key: {
                            document_key: '263b2e9e951c44fbbf6613322c3e2af1'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'ba886d7c7d66469797fa7809a9ded10e'
                        key: {
                            document_key: '4e57a62f87324a96984ca46b04ad34fd'
                            variable: '74d6e7a0a3023110571967d1361e616b'
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
                        table: 'sys_element_mapping'
                        id: 'babadb9e247b40c9aca470ca4c86e429'
                        key: {
                            id: 'dc00065433214dab90427eb8e81f5437'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'baf3ec156ce94cea8b971e400650e8d9'
                        key: {
                            document_key: '28b1f204578140aa8286fb4929bd4cda'
                            variable: 'dd54cf535320220002c6435723dc34fd'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'bbfbe06ce2514d4a8614e3872b3eaf90'
                        key: {
                            document_key: 'f88fa74df53141449796a295d0144d7c'
                            variable: '2bf688e637310300b8a62f3c8e41f1d0'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'bc0b59401b2f4e90b869fd236fcfbddd'
                        key: {
                            id: 'd628487f1960474fa7a7c12d6a8cb0d8'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
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
                        table: 'sys_element_mapping'
                        id: 'bc4382fab2864b8f8b378737da00d61f'
                        key: {
                            id: '0e8587e0111f4a0ca988939746138559'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'bc55b1a446774f97b239cc2976b3644e'
                        key: {
                            document_key: '4f4dda8b82de4020b3e51be3f9c1a50b'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'bc888a48da48488b8e4d29edb4f84c9f'
                        key: {
                            document_key: '4851b270723641b292a30403051208eb'
                            variable: '52ed1e5b5360220002c6435723dc3421'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'bcb6755c0ad54c839b8db86d8dedf31e'
                        key: {
                            document_key: 'dd11f82270e141dc82df0d437f73f962'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'bd25771855a4442a8735168340c92ada'
                        key: {
                            document_key: '8644bb45cdd64a3c83921eba8324ed20'
                            variable: 'bc43e004c76733005e5c45b881c26046'
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
                        table: 'sys_variable_value'
                        id: 'bd930d07ff6a4c9ea161845bbf8c93af'
                        key: {
                            document_key: 'cd37f24ffe0c47cb81a4a2d13089367a'
                            variable: '74d6e7a0a3023110571967d1361e616b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'bdb67d58ffa94b4b94b4dd9a1655f589'
                        deleted: true
                        key: {
                            document_key: '86ee740a27084e1b97bfa3f9507d0edc'
                            variable: 'd13d0b935320220002c6435723dc34c8'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'bdfab16d1a864043a39fa88f58c7dd71'
                        key: {
                            document_key: '655c837c0f0d4fae853da3c00561200b'
                            variable: '6e55da4e53a0220002c6435723dc34a0'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'be0659e323a24e3a8dfe246f7331ca42'
                        key: {
                            document_key: '60c2df0431524f6e89b42035a72c267c'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'be12bc7d06124fcfb26c6a140d227af0'
                        key: {
                            document_key: 'a2a1d61feef3415b93e8bbd2053f8c1e'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'be45132cfd9649368146202e5fb87738'
                        deleted: true
                        key: {
                            document_key: '9f846652720f448697e475c516ba069b'
                            variable: '989d9e235324220002c6435723dc3484'
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
                        table: 'sys_variable_value'
                        id: 'be8e0a243a8e4bec80738fab92b2f77a'
                        key: {
                            document_key: '6d2b5496d96b456893271d788ce29481'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'beb0cf6b88c74012bcc2835a7f13d759'
                        key: {
                            document_key: 'a77e723c483148e9bc32bc04575cb21a'
                            variable: 'dd54cf535320220002c6435723dc34fd'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bef70c31c71943b69ab92d6380c7b278'
                        key: {
                            name: 'x_711398_se_certificates_staging'
                            element: 'u_product_line'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'bf4c876d7d6b4a1d917d7d8cb1d56744'
                        key: {
                            document_key: '9b91962b36ef4c768ae841325b0a469a'
                            variable: 'c796d40497302200abe4bb7503ac4ad8'
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
                        table: 'sys_variable_value'
                        id: 'bfda2634f46c48c9b9a3da595506d407'
                        key: {
                            document_key: '56cb47a144f740c685109a7d7830b572'
                            variable: 'c2eb56e853422110248dddeeff7b1261'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c03b8c3d10cd44bfb3d028b7968c022e'
                        key: {
                            document_key: '4851b270723641b292a30403051208eb'
                            variable: '6aad5a575360220002c6435723dc34b0'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'c04d60bdb10b426eb3b85f0e6a264655'
                        key: {
                            sys_security_acl: '849760f3783047aa9aeb034a0c84f6b3'
                            sys_user_role: {
                                id: '510864fdf2b84952a7595fe5e602132e'
                                key: {
                                    name: 'x_711398_se.se_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c04f0151b8f142f9b3236d6f470cc7f3'
                        key: {
                            document_key: '8d4b8d5b88f042c28a70a80eacf8e2f7'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c0590bfb85fd417bae30929b38a944e2'
                        key: {
                            document_key: '782e05882eb6457ca0a502b843bad30c'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c0a395fa16da4e0087c55779691e2890'
                        key: {
                            document_key: 'd12162408e914b6599051d3c5bd9197b'
                            variable: 'ae1a857ddb5f3300f2410f95ca96191f'
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
                        table: 'sys_variable_value'
                        id: 'c12eaa954ef344a6875d11a11e9378d1'
                        key: {
                            document_key: '8b52a2d012b5494593182dbd597a36ef'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c1b1ff0994464dd081241a8c493916ab'
                        key: {
                            document_key: 'cd37f24ffe0c47cb81a4a2d13089367a'
                            variable: 'ad351a4e53a0220002c6435723dc34f0'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c1b52aa848594a51bddd4bd1d6c729f3'
                        deleted: true
                        key: {
                            document_key: '389f46abde1c4bc79d92f92e526ea607'
                            variable: '9024a37f671003007ba405225685efe5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c1ee82c5399a47e8aee795cb16de02f6'
                        key: {
                            document_key: 'd628487f1960474fa7a7c12d6a8cb0d8'
                            variable: '42f2564b73031300440211d8faf6a777'
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
                        table: 'sys_variable_value'
                        id: 'c26c137103d24802a0f2bfa986456c9c'
                        key: {
                            document_key: 'f3b8fa2209434b83b118221a7cb129d6'
                            variable: '7c5f6d2353e0220002c6435723dc34f6'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c35e69de8fed4dc087455022443d89e6'
                        key: {
                            document_key: '4bdc3abd8b764e55a26649881d6cdf89'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c3954952ff704e38b08d5462897a4a61'
                        key: {
                            document_key: '8d2f1cb6d719488ebe12eb643955de90'
                            variable: '51547e3953212110248dddeeff7b126b'
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
                        table: 'sys_variable_value'
                        id: 'c487e0e3a48a483eb23eca1ee4f33778'
                        key: {
                            document_key: '225812b4762d4044a52833999203336e'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
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
                        table: 'sys_variable_value'
                        id: 'c52f9fb15dee4e47872cf23c62b53382'
                        key: {
                            document_key: 'a2aad9fc482741f59bd0e83beb4ccf8e'
                            variable: '80f953535320220002c6435723dc340f'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c557c016713c4801b15cb12628a336b3'
                        key: {
                            document_key: '8d4b8d5b88f042c28a70a80eacf8e2f7'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c56d3981f2ae4422aa09bcbde47742b4'
                        key: {
                            document_key: 'bbdfc3bc18e643c7b04d320887fc056c'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'c5774f1e682945b6a111eb39b9a9af41'
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
                            element: 'certified_date'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c5ccff0b451a4c5a8359ed996f7dc05c'
                        key: {
                            document_key: '4ecb4a992cfe49aaa0ea14c36aba0fe7'
                            variable: '6619c7aa5320220002c6435723dc34e2'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c5d6937d22fc429f83d3c7ba040b0753'
                        key: {
                            document_key: 'dfcded0f9c5d4aaf8cfee79536f435c8'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'c5f7d3ce6b794a0684357af19fe480e8'
                        deleted: true
                        key: {
                            id: 'e05ebe1355f74fd2b5b3f30e7aca35f8'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
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
                        table: 'sys_variable_value'
                        id: 'c64472a080554ee1bbb0dd764dc4591e'
                        key: {
                            document_key: 'dfd08723eccb4555b4b16d75a455ecf1'
                            variable: '3eee292353e0220002c6435723dc343c'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c647e3294d074e448df60b4d7514036d'
                        key: {
                            document_key: '539b8915aca04251a2b2b7d2ed966256'
                            variable: '56e6bee65320220002c6435723dc34b9'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c77b2378edb6427e9ca578973b48d640'
                        key: {
                            document_key: 'd3f488da65c1484baf2f672038c78591'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c7803d78a2424430908d0eb82cc2dbaa'
                        key: {
                            document_key: '4bdc3abd8b764e55a26649881d6cdf89'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c7805e142e9e436ea4f249e93b90571f'
                        key: {
                            document_key: 'dfd08723eccb4555b4b16d75a455ecf1'
                            variable: '7c5f6d2353e0220002c6435723dc34f6'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'c79415fa0e5b4b68a5d22f606246ced8'
                        key: {
                            id: '3f5cfd93ea7d46458536c5e83d0cd54a'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
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
                        table: 'sys_element_mapping'
                        id: 'c7caf152fac74a3d9f8ede326169cc55'
                        key: {
                            id: '469eb58b8e5b484187e64816367591d0'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c7efc74bbf6d4ddaafc467b008c6c209'
                        deleted: true
                        key: {
                            document_key: '9fccfd3de1a94bfa83200051bf5196da'
                            variable: 'dd54cf535320220002c6435723dc34fd'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c7f2da61b7e44a269a43b6d0f5fbea6c'
                        key: {
                            document_key: '99955528292244bab411b7ef63b9c678'
                            variable: '51547e3953212110248dddeeff7b126b'
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
                        table: 'sys_ui_action_role'
                        id: 'c884f857cdee442ca82854922148842f'
                        key: {
                            sys_ui_action: '35046450d8b44c05aac3a9d6acfcd8a4'
                            sys_user_role: {
                                id: 'd0df25a58c524ed69caae2d2580aee5d'
                                key: {
                                    name: 'x_711398_se.se_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c8c44f299f65462885ce536c1939cbfa'
                        deleted: true
                        key: {
                            document_key: '09bc792283ce48c2a845bbf55813f2e8'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_ui_policy'
                        id: 'c90c558c3c614a60822cbd184cdd8d26'
                        key: {
                            table: 'x_711398_se_submission'
                            short_description: 'Lock Work notes when the Submission is Completed'
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
                        table: 'sys_element_mapping'
                        id: 'c978a15228dc41d091a554d6986843ee'
                        key: {
                            id: 'eff2f1b7d2f14099a28583fe2156a699'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c991e8e5b8744d3798829eb59439a8e6'
                        key: {
                            document_key: 'c24852e011814918872dd3807ceebfe1'
                            variable: '74d6e7a0a3023110571967d1361e616b'
                        }
                    },
                    {
                        table: 'sys_atf_test_suite_test'
                        id: 'c9ac308b9ea44f90b45be356b7675d6e'
                        key: {
                            test_suite: 'cf891548944e407ea4c3ce3b1c9439c0'
                            test: '815cffdcc8a94abb9d387c1bf48183de'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'ca4ae084d45c46d79f778807348c549e'
                        key: {
                            document_key: '4851b270723641b292a30403051208eb'
                            variable: '67400008676003007ba405225685efa4'
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
                        table: 'sys_element_mapping'
                        id: 'cac0ddb723ec419eb439e1bf753597fb'
                        deleted: true
                        key: {
                            id: '389f46abde1c4bc79d92f92e526ea607'
                            table: 'var__m_atf_input_variable_14872288df60220062fe6c7a4df26319'
                            field: 'field_values'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'cacddf01d0374ea5a054dd1ef0d66641'
                        key: {
                            document_key: '75827398f5854d5bb92c546cb38b1548'
                            variable: '6e5a1b535320220002c6435723dc3498'
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
                        table: 'sys_variable_value'
                        id: 'cbca97d30f7144c3a739fe5936a4e9dc'
                        key: {
                            document_key: '51dd19cbd40443e1af31799291225128'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'cc30286385b148c8ac26178c4d8a5837'
                        key: {
                            document_key: '915a214e5b4c4a9ea55088acecffe0ae'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'cc3a5e883fca4feabb964a228d0fb00f'
                        key: {
                            document_key: '73216deb3c174feb87f64bcfaaeef22a'
                            variable: '51547e3953212110248dddeeff7b126b'
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
                        table: 'sys_variable_value'
                        id: 'cdb96297250c4f3590afa86987ef3e1a'
                        key: {
                            document_key: 'c145f1f940934d9185bb1a7c09a9a34b'
                            variable: 'c2eb56e853422110248dddeeff7b1261'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'cdbd4abe2fd14b86a7731c50049fcadc'
                        key: {
                            document_key: 'f88fa74df53141449796a295d0144d7c'
                            variable: '2c77697437f1030064a52f3c8e41f15a'
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
                        table: 'sys_variable_value'
                        id: 'ce4d67da1db54cd9a00dc4d2a4dda435'
                        key: {
                            document_key: '225812b4762d4044a52833999203336e'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
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
                        table: 'sys_variable_value'
                        id: 'cfbf60fbe5324b848b2ce09f816af887'
                        key: {
                            document_key: '5e467dde917240a9859a9861332b2452'
                            variable: 'b3dba2465320220002c6435723dc34f0'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'cfc097c82dfa4e86a63e40d04322d7e5'
                        key: {
                            document_key: '22445169193b4bae912717c011d7cbcf'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
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
                        table: 'sys_variable_value'
                        id: 'd010710ebc7e40398ab374171710c4fc'
                        key: {
                            document_key: '469eb58b8e5b484187e64816367591d0'
                            variable: '586e2c4253e0220002c6435723dc3415'
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
                        table: 'sys_variable_value'
                        id: 'd12dc418486e4ee880680fb87a9b33ef'
                        key: {
                            document_key: 'ed727cedd73c4860a3b040aacfe7a76c'
                            variable: 'b3dba2465320220002c6435723dc34f0'
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
                        table: 'sys_variable_value'
                        id: 'd185b45eabdb43c8b2decf8d336f6836'
                        key: {
                            document_key: 'd19ed67160ec483987246740163e8a2e'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
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
                        table: 'sys_variable_value'
                        id: 'd28f14893a3045d68a6b819a51dbeeba'
                        key: {
                            document_key: '398665856caa48a5bb14dfe7dd6114b8'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd3470930e2a34ccebecdfdefed3486f6'
                        key: {
                            document_key: '1dd8456248db44909763e1a86c8674a7'
                            variable: '6e55da4e53a0220002c6435723dc34a0'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd3ba6b21f5fe431a89a00bc892f8db5a'
                        key: {
                            document_key: '4f4dda8b82de4020b3e51be3f9c1a50b'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'd3c4c2e382b644d395e9cbbc99149b0c'
                        key: {
                            id: 'c80982f4c13743eaba03c8d19e94ffa5'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd3f19612f0be4367beb419a797d824bc'
                        key: {
                            document_key: 'a77e723c483148e9bc32bc04575cb21a'
                            variable: 'e6e3c7535320220002c6435723dc3496'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'd46d92b35dce44169a2d9d6241836033'
                        key: {
                            id: '3d8cf9b8d11445f991e3e34ec6412e6a'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd471ff9615824386b0dd01a68e88c80a'
                        key: {
                            document_key: '49b221c11e0645b8b1902b8c07dc8b56'
                            variable: 'ba62b4075320220002c6435723dc34b9'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd4ad5c4ab87140a3870b49236423cde8'
                        key: {
                            document_key: '8960d14965984a64bc2a6247fd6fa6c2'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd4c37a7b37cb4015bc1673f5a396a371'
                        key: {
                            document_key: '6556f1186d8440b88d5268ab2936026d'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd4c9c4b2af994da79ba597aa0aa871a9'
                        key: {
                            document_key: '56cb47a144f740c685109a7d7830b572'
                            variable: '74d6e7a0a3023110571967d1361e616b'
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
                        table: 'sys_variable_value'
                        id: 'd56806baf348465b80142c3ebc984ef9'
                        key: {
                            document_key: 'a2aad9fc482741f59bd0e83beb4ccf8e'
                            variable: '592a17535320220002c6435723dc34d7'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd5ae156a36c7443baa05e04b03decf35'
                        key: {
                            document_key: '6b59ffc66e9e4ef2bd30599905386c6c'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd5ef322e486f4b24aa0e270947d0f48a'
                        key: {
                            document_key: '4f4dda8b82de4020b3e51be3f9c1a50b'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd641f47ecda349409fb41f12ab84d479'
                        key: {
                            document_key: '8960d14965984a64bc2a6247fd6fa6c2'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd668b3be2ccd4610bcc4bd9d5dcf168f'
                        key: {
                            document_key: 'c40fc761e4324841a66feaa6206f5fa9'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd6764014a620436f8bd04b5945c03fd8'
                        key: {
                            document_key: 'f9cf9d0b10db44ec96a29b237a1c128b'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd70624ecf34e416da8d8e7828d92df65'
                        key: {
                            document_key: 'd19ed67160ec483987246740163e8a2e'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd760b9eb10a24f6d9da639ab33a1bda5'
                        key: {
                            document_key: '646a68dc34de4c9cbed04e37099d6b4d'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd793b93608ff47a9ae3819be2ee6ff46'
                        deleted: true
                        key: {
                            document_key: '2f020394fc814427a3ba809a9b4b8b1d'
                            variable: '74d6e7a0a3023110571967d1361e616b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd79adc62de0e40b89ce5ea936394123a'
                        key: {
                            document_key: 'a677833bacd14280a2facdde9a3e56ba'
                            variable: 'b4e438ae73322010ac1560bdfaf6a7a2'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd7df67bd9b6346958c4250b13ab1f8e8'
                        key: {
                            document_key: '90a63a077b9f43b489d5c1a5437dc7c0'
                            variable: 'e81ad3535320220002c6435723dc340c'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd7e9938ff38a4739925280e645e45e5b'
                        deleted: false
                        key: {
                            document_key: '2bcf8f10463149809a7581d26e1b6859'
                            variable: '80625552c3833300eaac11fe81d3aedc'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'd81bb3a7ddd74869a66e704b61ba9d47'
                        key: {
                            id: 'cd37f24ffe0c47cb81a4a2d13089367a'
                            table: 'var__m_atf_input_variable_5f2e0e535332120028bc29cac2dc34d3'
                            field: 'record_id'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd89d6bc140a84e4b91a44bcbdcbf2211'
                        key: {
                            document_key: 'bc8dcab2be944a9cb5b8d755411b9f7e'
                            variable: '9024a37f671003007ba405225685efe5'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'd8b8559f92e64f939000a4a4fba9a62b'
                        key: {
                            id: '3734bedf7a344a418b5b6f6d60a6ea79'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd8d1460060c247a19a6d1fe72defac80'
                        key: {
                            document_key: '90a63a077b9f43b489d5c1a5437dc7c0'
                            variable: 'b1fefcde73633300b19898b8caf6a7af'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd93ad44f1923437f9aa12596b7cd0351'
                        key: {
                            document_key: '0eb9d9b020514786af8960894abc5087'
                            variable: 'b4e438ae73322010ac1560bdfaf6a7a2'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd9640dedaf4f4013b65ac1da8efd06cf'
                        key: {
                            document_key: 'a3edc54fa9984ef4866b10642b77e2ca'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd985ac3b4fb0456c9da929f242caf9bc'
                        key: {
                            document_key: 'abb4ed390b3d470e9b67a29a95fa049f'
                            variable: '586e2c4253e0220002c6435723dc3415'
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
                        table: 'sys_element_mapping'
                        id: 'da0946f9fadf4dcab7de51d7150a449a'
                        key: {
                            id: '4a83d92b6d01494ba6461eff1c6cfea7'
                            table: 'var__m_atf_input_variable_1f39a288df60220062fe6c7a4df2639d'
                            field: 'record_id'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'dac1ca319072496693fbd84844c13763'
                        key: {
                            document_key: '171fb967fc8b49cca3b4918187587750'
                            variable: '51547e3953212110248dddeeff7b126b'
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
                        table: 'sys_variable_value'
                        id: 'dad6e96f244b4746b5df3b59d83f9686'
                        deleted: true
                        key: {
                            document_key: '2f020394fc814427a3ba809a9b4b8b1d'
                            variable: 'b124164e53a0220002c6435723dc34c5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'db9f9ef0f3264071a439e8a5091e68ec'
                        key: {
                            document_key: '22470d70b95d4b57aa2030adc7735862'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'dba3dc6ec7624b10a8b527e2b6625b18'
                        key: {
                            document_key: 'd3f488da65c1484baf2f672038c78591'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'dbd22820f3ce4da7987643554e6a18b8'
                        key: {
                            document_key: '8cf561ab50f54508903badc6d5c3fcb1'
                            variable: '17d732a9c7a333005e5c45b881c26007'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'dbdf51b98141487384d9b8545641fedc'
                        key: {
                            document_key: '991ec0ae3429451680c81eac0d702a37'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'dc0aba85ff504545ba29cfdd7f9bb902'
                        key: {
                            document_key: '400da504e54441ee824b20a2a9fc34c6'
                            variable: '67400008676003007ba405225685efa4'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'dcb4fd522fc94b0a8959b3c871eadd2f'
                        key: {
                            document_key: '6556f1186d8440b88d5268ab2936026d'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
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
                        table: 'sys_element_mapping'
                        id: 'dd4b9ab4405e4019ad2ee6beb3093285'
                        key: {
                            id: 'e0808b26b3ed469b8855920d9d9cca11'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
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
                        table: 'sys_variable_value'
                        id: 'ddb26bae0fe648d3af1c6a3a0b798f06'
                        key: {
                            document_key: '334ef5062bec4175affb7c2144d63385'
                            variable: '6aad5a575360220002c6435723dc34b0'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'ddbb02e6ddfb42cab1766d897013d01d'
                        key: {
                            document_key: 'cfd418da608b430cb783b7da1836ca4d'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'ddd2965db3cd4e26aabb7a9cd6ade067'
                        key: {
                            document_key: '6d2b5496d96b456893271d788ce29481'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'ddea6421b978458483179c8c60d47242'
                        key: {
                            document_key: 'bb69ffede2194bbfa88112a641d95f5a'
                            variable: 'ad351a4e53a0220002c6435723dc34f0'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'de25e00b3e29429eb611f15b3614de4a'
                        key: {
                            document_key: 'bb69ffede2194bbfa88112a641d95f5a'
                            variable: 'b124164e53a0220002c6435723dc34c5'
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
                        table: 'sys_element_mapping'
                        id: 'deb6e7078a9040639a385d2699d0c96a'
                        key: {
                            id: '5dfaf6217ef444bd994cc88bf30749eb'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'deba2806fa86481d9c5f0c41984c718b'
                        key: {
                            document_key: 'e6438ba894ff4c0dbfc238889a3d3c11'
                            variable: 'e81ad3535320220002c6435723dc340c'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'dec63e9484924e46adcaf84a411715ab'
                        key: {
                            document_key: '4ecb4a992cfe49aaa0ea14c36aba0fe7'
                            variable: 'ba62b4075320220002c6435723dc34b9'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'df13f6d5bbc540e2acccf0a723a29728'
                        key: {
                            document_key: '8914a6fbc1d340e1b5f5123307474703'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'df4c13c28ae142848f727e128b254961'
                        key: {
                            document_key: 'd628487f1960474fa7a7c12d6a8cb0d8'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'df825b929ddf460c83826e06c84f4627'
                        key: {
                            document_key: 'e616877eabd148c08a2184a458957c19'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'dfa84480e3ed4f239f344bf1ec4d3e87'
                        deleted: true
                        key: {
                            id: '7b9ba0441f3b4ff495a91edb7d8bde24'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
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
                        table: 'sys_element_mapping'
                        id: 'dfe72490bab54bfab09506d7351ae943'
                        key: {
                            id: 'cfd418da608b430cb783b7da1836ca4d'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
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
                        table: 'sys_element_mapping'
                        id: 'e01251dc9f8d4a5f9f39825b6fc2e624'
                        deleted: true
                        key: {
                            id: '887eb04225c94d869cc42fe269f1effa'
                            table: 'var__m_atf_input_variable_14872288df60220062fe6c7a4df26319'
                            field: 'field_values'
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
                        table: 'sys_variable_value'
                        id: 'e06a4305776f4f7786341d55b53bc5fe'
                        key: {
                            document_key: '4ecb4a992cfe49aaa0ea14c36aba0fe7'
                            variable: '56e6bee65320220002c6435723dc34b9'
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
                        table: 'sys_variable_value'
                        id: 'e12449202b964ccf8a115879b62572fd'
                        key: {
                            document_key: 'c2fb91d8c3244a3bba5b9862f2f96474'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'e17db10ac71a4ced86ca56be4d6d535f'
                        key: {
                            document_key: 'b5d7be1deef04aa8a78a0eb689c9d285'
                            variable: 'ba62b4075320220002c6435723dc34b9'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'e19336a1a21f4ae1aac53411557ca6dc'
                        key: {
                            document_key: '5e4babd890c84729b3008c1348d9e816'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'e1d305f6aaa94537b77ba6a9df6faf6d'
                        key: {
                            document_key: '3f5cfd93ea7d46458536c5e83d0cd54a'
                            variable: '586e2c4253e0220002c6435723dc3415'
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
                        table: 'sys_variable_value'
                        id: 'e30af024687b4a529c182cbefcc81222'
                        key: {
                            document_key: '2c5d9925b63541b4a9b043330f789427'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e3b2c510d9894e3c968191aebc327ba9'
                        key: {
                            name: 'x_711398_se_skills_staging'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_atf_test_suite_test'
                        id: 'e416d0ec060042fab738eaa45f313255'
                        key: {
                            test_suite: 'cf891548944e407ea4c3ce3b1c9439c0'
                            test: 'fd9d1b4f4fb2422c9711cd1b6fc3976f'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'e44b790ecc514aff9df23a999574f56c'
                        key: {
                            document_key: '54bf29b8508e4213b68774b6361c4b98'
                            variable: 'ff6e125353a0220002c6435723dc3442'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'e450fb2230ff475587fb3ecb959bb05d'
                        key: {
                            document_key: 'd19ed67160ec483987246740163e8a2e'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
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
                        table: 'sys_variable_value'
                        id: 'e502ec9b85c14181aaf576640073a441'
                        key: {
                            document_key: '8914a6fbc1d340e1b5f5123307474703'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'e52fd0870b9a4035bc8fdf02bb27f6f0'
                        key: {
                            id: '6c46b4ffca2b47279efb1ca27cbaf306'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'e5c9502a733a4fa9af7786743802b418'
                        key: {
                            document_key: '3f03179c6be845939d31acb89b068e0a'
                            variable: '586e2c4253e0220002c6435723dc3415'
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
                        table: 'sys_variable_value'
                        id: 'e60392b990f7477ea63cd8129d1b68aa'
                        key: {
                            document_key: '0eb9d9b020514786af8960894abc5087'
                            variable: '4a3319d73702030064a52f3c8e41f1a9'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'e67eb294e872445fba0ab2c6adf73673'
                        key: {
                            document_key: '4bdc3abd8b764e55a26649881d6cdf89'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'e6c983e45651458fbda031c05aa42458'
                        key: {
                            document_key: '21b6a3f4018a44179179f67d3547b907'
                            variable: 'dd54cf535320220002c6435723dc34fd'
                        }
                    },
                    {
                        table: 'sys_atf_test_suite_test'
                        id: 'e701ec7babe4467b83efad86ad0882a8'
                        key: {
                            test_suite: 'cf891548944e407ea4c3ce3b1c9439c0'
                            test: 'ac892b1d24664958b8adb90cfdaa2198'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e713fdada94d40a1bd0bd045ccd124eb'
                        key: {
                            name: 'x_711398_se_skills_staging'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'e73ddf1fa9ca461ca1590ebbb58c22f7'
                        key: {
                            document_key: '168034dbfea64f38b53f7f2ea92f9c34'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'e7f9c6bdc347470684aae443bb6dab7a'
                        deleted: true
                        key: {
                            document_key: 'bf1e21d6e4cf46d2a784d5102fefdaa3'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
                        }
                    },
                    {
                        table: 'sys_atf_test_suite_test'
                        id: 'e82946f6af8b4f6d92023ef8e0edee4a'
                        key: {
                            test_suite: 'cf891548944e407ea4c3ce3b1c9439c0'
                            test: 'a8a82f22be2a4b21964113b9641b252f'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'e82c01885e614524bcbf6a69b8d93292'
                        deleted: true
                        key: {
                            document_key: '2ce08f1880f748a4837cca6febc3b82f'
                            variable: 'bb84ed825320220002c6435723dc3400'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'e8417e2d82c04735b9b9f770d0123ab5'
                        key: {
                            document_key: '6d2b5496d96b456893271d788ce29481'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'e85b2da9890e4fa281930d84cf8097e1'
                        key: {
                            document_key: 'dfcded0f9c5d4aaf8cfee79536f435c8'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'e8b2534f8f6a4ec98733fdd956aa0b00'
                        key: {
                            document_key: 'a677833bacd14280a2facdde9a3e56ba'
                            variable: '8570e0e33756030064a52f3c8e41f16c'
                        }
                    },
                    {
                        table: 'sys_transform_entry'
                        id: 'e92e503365d3484caa69f8bffddc7bc0'
                        key: {
                            map: '15df75777d484d598f26cca5929cb853'
                            target_field: 'name'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'e94524fc9628486381506b26609e946e'
                        key: {
                            document_key: '8b5782a176064e7391b0f217fc3548a4'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'e9c7211ee89f41d9b55fc07a5d5b59df'
                        key: {
                            document_key: '8cf561ab50f54508903badc6d5c3fcb1'
                            variable: '74d6e7a0a3023110571967d1361e616b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'ea01e21925cf405ea7953e6e02505330'
                        key: {
                            document_key: '8d4b8d5b88f042c28a70a80eacf8e2f7'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'ea4c60de70c6428da9e2c28688cbbd02'
                        key: {
                            document_key: '22445169193b4bae912717c011d7cbcf'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'ea840419e40b44b4a350b6e1f5061f99'
                        key: {
                            document_key: '8b351499776b4e69bc92ee33fd237101'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'eab973b54d8e472c971281c2ab58ed2f'
                        key: {
                            document_key: '334ef5062bec4175affb7c2144d63385'
                            variable: 'ff6e125353a0220002c6435723dc3442'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'eb1caa4d3c5e41ba906e955800d5114c'
                        key: {
                            document_key: '4e57a62f87324a96984ca46b04ad34fd'
                            variable: '6e55da4e53a0220002c6435723dc34a0'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'eb858835de1741fd9d72afa9dbbd1a6c'
                        key: {
                            document_key: '6e1b44b3218b4278a06e0ba0951e87ec'
                            variable: '90144b535320220002c6435723dc3488'
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
                        table: 'sys_documentation'
                        id: 'eb987575189c48679250c73b37a68590'
                        key: {
                            name: 'x_711398_se_cert_acquisition'
                            element: 'certification_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'ebdf29f2bbc84eb1b3cfcbff377ff178'
                        key: {
                            document_key: 'a09f35f327f7469cacb3152648f53480'
                            variable: 'c2eb56e853422110248dddeeff7b1261'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'ebfed76de91240eaa8582564044e7f49'
                        key: {
                            id: '334ef5062bec4175affb7c2144d63385'
                            table: 'var__m_atf_input_variable_1f39a288df60220062fe6c7a4df2639d'
                            field: 'record_id'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'ec268d2fa0c945b9900dbcffce105c30'
                        key: {
                            id: '7b3bc241dff54536a40ee7103eee110e'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'ec5195b4d7e348749557817577b797b7'
                        deleted: false
                        key: {
                            document_key: '677ba1da2cad447b9555be912694a0cf'
                            variable: '7d821952c3833300eaac11fe81d3ae2e'
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
                        table: 'sys_variable_value'
                        id: 'ec74abcee9b2438a9f059dd203244008'
                        key: {
                            document_key: '655c837c0f0d4fae853da3c00561200b'
                            variable: '74d6e7a0a3023110571967d1361e616b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'eca8a91594df4e02a746971301b15d63'
                        key: {
                            document_key: 'f9cf9d0b10db44ec96a29b237a1c128b'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'ecb717e46dab40e7862ca1ce586f10ff'
                        key: {
                            id: '56cb47a144f740c685109a7d7830b572'
                            table: 'var__m_atf_input_variable_5f2e0e535332120028bc29cac2dc34d3'
                            field: 'record_id'
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
                        table: 'sys_element_mapping'
                        id: 'edd797ae5ae149cf99aa585da38fc082'
                        key: {
                            id: 'a994165cead24f6cbccebd95d55cf250'
                            table: 'var__m_atf_input_variable_1f39a288df60220062fe6c7a4df2639d'
                            field: 'record_id'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'edf0b6c1d893460793f077c759a723d2'
                        key: {
                            document_key: 'd583022a45254c568b3775c16fedf60a'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'edf27b28e704463bbf960e57298e4f67'
                        key: {
                            document_key: '3b860fa66d974e7ca7fdc5dbf00521a9'
                            variable: '586e2c4253e0220002c6435723dc3415'
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
                        table: 'sys_variable_value'
                        id: 'ee36cdae76414eb088c2e54cc6c9691b'
                        key: {
                            document_key: 'a994165cead24f6cbccebd95d55cf250'
                            variable: '52ed1e5b5360220002c6435723dc3421'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'ee7e9a45271a4e6a88353c66b15718e8'
                        key: {
                            document_key: 'a677833bacd14280a2facdde9a3e56ba'
                            variable: '90749dd73702030064a52f3c8e41f12d'
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
                        table: 'sys_variable_value'
                        id: 'eea0753ce0ce456782d1e5d452f26772'
                        key: {
                            document_key: '225812b4762d4044a52833999203336e'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'eead3dc7c3ec4aedafa35152a7ce2419'
                        key: {
                            document_key: '9b91962b36ef4c768ae841325b0a469a'
                            variable: 'ae8b91c9ffa333008d3f5d9ad53bf1ba'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'eebe07ce5bd742b0bb8514b474af3ed0'
                        key: {
                            document_key: 'a342d84aad2c4cbe95d54b1595268403'
                            variable: '6e55da4e53a0220002c6435723dc34a0'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'eed251df64834661bb6969b294e45607'
                        key: {
                            document_key: 'c40fc761e4324841a66feaa6206f5fa9'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
                        }
                    },
                    {
                        table: 'sys_transform_entry'
                        id: 'eedc7dff73b9473b8db0f32d75817d7c'
                        key: {
                            map: 'f4c3556260e34271adcf3d9a80d22527'
                            target_field: 'description'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'ef143cb21a2a451e9bd3f593020fd2ce'
                        key: {
                            document_key: '4851b270723641b292a30403051208eb'
                            variable: 'ff6e125353a0220002c6435723dc3442'
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
                        table: 'sys_transform_entry'
                        id: 'efdfece981e340fea45184a11508b7c0'
                        key: {
                            map: '15df75777d484d598f26cca5929cb853'
                            target_field: 'product_line'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f062b280bcad444786ff5514780fa879'
                        key: {
                            document_key: 'a450d30d60a44f5a9ec7a33e6a7d4921'
                            variable: '90144b535320220002c6435723dc3488'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f0bb4c558255403fbae5da8d254a7717'
                        key: {
                            document_key: '8914a6fbc1d340e1b5f5123307474703'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'f0e8b82c6b94432199a76db740a48659'
                        key: {
                            id: '97e4944c61aa4c91a902eb7e411d15b3'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f13aea072f8a4d819b736b33e3540e2f'
                        key: {
                            document_key: '6556f1186d8440b88d5268ab2936026d'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
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
                        table: 'sys_variable_value'
                        id: 'f1fb91dd8351440bad7d5c0f1c1e6d3b'
                        key: {
                            document_key: '8b5782a176064e7391b0f217fc3548a4'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f248a7e680a9488898c3cca9f4d836a9'
                        key: {
                            document_key: 'a2aad9fc482741f59bd0e83beb4ccf8e'
                            variable: 'e63a97535320220002c6435723dc34b8'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: 'f261717015b14a8881228328bae76613'
                        key: {
                            logical_table_name: 'x_711398_se_skill'
                            col_name_string: 'product_line,description'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f28a96f81f8041ce91e75e2a2c7796cf'
                        key: {
                            document_key: '42e0e16a8cec445bb5652db8ff3e5d2a'
                            variable: '6619c7aa5320220002c6435723dc34e2'
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
                        table: 'sys_variable_value'
                        id: 'f3480b4447c842c498f28cda90df1f59'
                        key: {
                            document_key: 'dd11f82270e141dc82df0d437f73f962'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
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
                        table: 'sys_element_mapping'
                        id: 'f3c0f17b74bf45afafb6dc3ec9c7a72e'
                        key: {
                            id: '02986b402a8f48a98aac864eb26fd040'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f40dce4f67d64c4d8c9608f796f4eae3'
                        key: {
                            document_key: '7d7c937fb34443098c3a1d96d37b80e4'
                            variable: 'e6e3c7535320220002c6435723dc3496'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'f4154ee6072c493faf65bfde743808ab'
                        key: {
                            id: '84ba951e590b49d283de8f54974ca18f'
                            table: 'var__m_atf_input_variable_1f39a288df60220062fe6c7a4df2639d'
                            field: 'record_id'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f43795364fd648229e750894164cdc79'
                        key: {
                            document_key: '263b2e9e951c44fbbf6613322c3e2af1'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f440c5566293415fa1c5810a237d0350'
                        key: {
                            document_key: '424f75b4ffa944e88c82164d0d9a8e78'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f47607a3fc8e427e87702871109ef1e9'
                        key: {
                            name: 'x_711398_se_certificates_staging'
                            element: 'u_certificate'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f47d3657507446bd8e2961fb45fd5ae4'
                        key: {
                            document_key: '225812b4762d4044a52833999203336e'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f4dc0c6c9bb34e9d9e7b8903121260db'
                        key: {
                            document_key: '773883304e0f43f6bfd03222dfb422d4'
                            variable: 'ba62b4075320220002c6435723dc34b9'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f52100a58f314acabe13821c33787703'
                        key: {
                            document_key: '4bdc3abd8b764e55a26649881d6cdf89'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f551e19c01794cefb94b1fd1665e5f35'
                        key: {
                            document_key: 'd583022a45254c568b3775c16fedf60a'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'f556fe259ec141bebb6f89837a6d678e'
                        key: {
                            id: '4e57a62f87324a96984ca46b04ad34fd'
                            table: 'var__m_atf_input_variable_5f2e0e535332120028bc29cac2dc34d3'
                            field: 'record_id'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f56ea3b4bdbb465db4ba4f5542cf145c'
                        key: {
                            document_key: '7fb217a124294c68bb160e659dce2cc0'
                            variable: '90144b535320220002c6435723dc3488'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'f59af1ccf88c41eb90ac4b6c30a41cb4'
                        key: {
                            id: '91a59f7bc4ce4f7f84e7aa66e97da74d'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'f5ab05fe870846c59a039b841ccd15bc'
                        key: {
                            id: '349981c3cfd140b89c69f71f77d55f82'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f62ac5d712564e3f9d1d77d56658c18f'
                        key: {
                            document_key: '8cf561ab50f54508903badc6d5c3fcb1'
                            variable: 'c2eb56e853422110248dddeeff7b1261'
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
                        table: 'sys_variable_value'
                        id: 'f659a24526c64836a77c10f3a382541e'
                        key: {
                            document_key: '655c837c0f0d4fae853da3c00561200b'
                            variable: 'b124164e53a0220002c6435723dc34c5'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'f676022ab2244a67bdaff8c58003f577'
                        key: {
                            id: '8726abd43d61408d95d18916f6fccf0e'
                            table: 'var__m_atf_input_variable_5f2e0e535332120028bc29cac2dc34d3'
                            field: 'record_id'
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
                        table: 'sys_element_mapping'
                        id: 'f6999195fa3b43faa332b45ae24c9092'
                        key: {
                            id: 'b019657a8b6f4f5ea7559d2f942348c0'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
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
                        table: 'sys_variable_value'
                        id: 'f76afac151f44323b5845136293588b3'
                        key: {
                            document_key: '539b8915aca04251a2b2b7d2ed966256'
                            variable: 'bc43e004c76733005e5c45b881c26046'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f7b3ba82d30440158ba427c77a6667d0'
                        key: {
                            document_key: 'd3f488da65c1484baf2f672038c78591'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f7fcac5a7b5e4ea9898f52b045cc5d17'
                        key: {
                            document_key: '0e349ef379294be58ba46b649b613ae5'
                            variable: '586e2c4253e0220002c6435723dc3415'
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
                        table: 'sys_variable_value'
                        id: 'f88deeb2bcd545b491c4f3afdbdee4f4'
                        key: {
                            document_key: '334ef5062bec4175affb7c2144d63385'
                            variable: '52ed1e5b5360220002c6435723dc3421'
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
                        table: 'sys_variable_value'
                        id: 'f8bcbe21e4c34c3795a18665b940183d'
                        deleted: true
                        key: {
                            document_key: '2c4d7ad88912481e818995a91a043871'
                            variable: '90144b535320220002c6435723dc3488'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'f95c18a6c7254106aef17fc7db934d94'
                        key: {
                            id: '5c970e4e2ab4462b9dcba5364355ce14'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f9624aa8a4844de8a7e41ff07325e658'
                        deleted: true
                        key: {
                            document_key: '169f34052c8a40e0adc8813c8d763a0c'
                            variable: 'e6e3c7535320220002c6435723dc3496'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f977214800a34dc092283ac19c1d9b23'
                        key: {
                            document_key: '426f25a0ea4841fe9344bd74d870872f'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f98c94187bf747dabc0129ac15ef3588'
                        key: {
                            document_key: '49b221c11e0645b8b1902b8c07dc8b56'
                            variable: 'bc43e004c76733005e5c45b881c26046'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'fa3ae34d28074426ba46c50bacc6e9f1'
                        key: {
                            document_key: '424f75b4ffa944e88c82164d0d9a8e78'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'fa7023c1eb8e40728028db4c3e15d92f'
                        deleted: true
                        key: {
                            document_key: '887eb04225c94d869cc42fe269f1effa'
                            variable: '90144b535320220002c6435723dc3488'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'fa7c65ca9806446294e4c23963db9bbe'
                        key: {
                            document_key: 'a0152d37cbf34736b3987a85e9b8598f'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'fa90a1873daf4dc78880fa57eaf14581'
                        key: {
                            document_key: 'c24852e011814918872dd3807ceebfe1'
                            variable: 'b124164e53a0220002c6435723dc34c5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'fb19118635dc4f6aadb2776e6e9c5921'
                        key: {
                            document_key: 'd19ed67160ec483987246740163e8a2e'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'fc6f22c2873043a4b361af268acf2236'
                        deleted: false
                        key: {
                            document_key: 'cd658824e728424eac213a133c660a85'
                            variable: '80625552c3833300eaac11fe81d3aedc'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'fc9ae2f93212428fae4a0e757534031d'
                        key: {
                            document_key: '5ef9071c5553420fa675cb6efbb817f1'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'fcae48a4551e491691b9b724bb59b310'
                        key: {
                            id: '54bf29b8508e4213b68774b6361c4b98'
                            table: 'var__m_atf_input_variable_1f39a288df60220062fe6c7a4df2639d'
                            field: 'record_id'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'fcbb8711c50a4e4282bd1d8fb42a8635'
                        deleted: true
                        key: {
                            document_key: '4441154a98ae4666b5d6f2742d9b4bd8'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'fce33af80a1441f4bc29bd9487af26b7'
                        deleted: true
                        key: {
                            document_key: '2c4d7ad88912481e818995a91a043871'
                            variable: '9024a37f671003007ba405225685efe5'
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
                        table: 'sys_element_mapping'
                        id: 'fd55ebd9f5fc4cf6bb750f41becdd07e'
                        key: {
                            id: '6b59ffc66e9e4ef2bd30599905386c6c'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            field: 'user'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'fdd5e0830cb6438d8f581a9c9030cce5'
                        key: {
                            document_key: '3734bedf7a344a418b5b6f6d60a6ea79'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'fde31dbb52164f4d9582ac3358a0edf9'
                        key: {
                            document_key: '85950516a5c54930a116b9638ddd8ebc'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'fdedc7df7a7e42bc90686bf6d7ee9725'
                        key: {
                            document_key: 'd9e453033d2242c98e497bcc25ed9772'
                            variable: '592a17535320220002c6435723dc34d7'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'fe0125b5358046ff80706ad1e62197a3'
                        key: {
                            document_key: 'c8870d98b2df41f8a0a831b914402528'
                            variable: '1cd3cda20fe2330091d0f00c97767e37'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'fe0c28e6db4046b594142127f6228fdb'
                        key: {
                            id: '426f25a0ea4841fe9344bd74d870872f'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'fe53fda9ab5c41428248883bb72ee408'
                        key: {
                            document_key: '6fb1e8e656394e298a12fb4cda569f4d'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'fe6965cede0646478029c8457a5fb112'
                        key: {
                            document_key: 'f3b8fa2209434b83b118221a7cb129d6'
                            variable: '334ea2f153212110248dddeeff7b1255'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'feb177efc9c646fc8f1a7c0739ec4a34'
                        deleted: true
                        key: {
                            document_key: '4441154a98ae4666b5d6f2742d9b4bd8'
                            variable: '42f2564b73031300440211d8faf6a777'
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
                        table: 'sys_variable_value'
                        id: 'ff497decb30942829c980e3b82ce990c'
                        key: {
                            document_key: '99955528292244bab411b7ef63b9c678'
                            variable: '535cb5ab53233300f06fddeeff7b1247'
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
                        table: 'sys_variable_value'
                        id: 'ff5b1f69df8d4232a6fb0491f2eedd66'
                        deleted: true
                        key: {
                            document_key: '169f34052c8a40e0adc8813c8d763a0c'
                            variable: '9024a37f671003007ba405225685efe5'
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
                    {
                        table: 'sys_element_mapping'
                        id: 'ff9b981c79e04e458bb8af1cff7fbd1b'
                        key: {
                            id: '1dd8456248db44909763e1a86c8674a7'
                            table: 'var__m_atf_input_variable_5f2e0e535332120028bc29cac2dc34d3'
                            field: 'record_id'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'ffa09b45ac3b4dbaa73dea6072830e64'
                        key: {
                            document_key: '22445169193b4bae912717c011d7cbcf'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'ffa8af6b54d04649838e8c244e090b50'
                        key: {
                            document_key: '84ba951e590b49d283de8f54974ca18f'
                            variable: '67400008676003007ba405225685efa4'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'ffb12fb9443348f8a178efce0219508f'
                        key: {
                            id: 'd583022a45254c568b3775c16fedf60a'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'fff743d9d43a4aafa41c62a706bafb53'
                        key: {
                            document_key: 'c8870d98b2df41f8a0a831b914402528'
                            variable: 'e4650d260fe2330091d0f00c97767ec9'
                        }
                    },
                ]
            }
        }
    }
}
